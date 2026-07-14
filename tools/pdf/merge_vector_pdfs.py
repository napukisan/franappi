from __future__ import annotations

import json
import os
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(os.environ.get("PDF_OUT_DIR", "artifacts/vector-pdf-pages")).resolve()
FINAL = Path(os.environ.get("PDF_FINAL_DIR", "artifacts/vector-pdfs")).resolve()
FINAL.mkdir(parents=True, exist_ok=True)

OUTPUTS = {
    "it": "Francesco Nappi - Life is a game - ITA - VECTOR.pdf",
    "en": "Francesco Nappi - Life is a game - ENG - VECTOR.pdf",
}

EXPECTED_TITLES = {
    "it": [
        "FRANCESCO NAPPI",
        "ACTOR & SPEAKER",
        "COPYWRITER",
        "TECH ADDICTED",
        "TRAINER & COACH",
        "FREELANCE CREATIVE",
        "VIBE CODER",
        "FOUNDER",
    ],
    "en": [
        "FRANCESCO NAPPI",
        "ACTOR & SPEAKER",
        "COPYWRITER",
        "TECH ADDICTED",
        "TRAINER & COACH",
        "FREELANCE CREATIVE",
        "VIBE CODER",
        "FOUNDER",
    ],
}


def rect(data: dict) -> fitz.Rect:
    return fitz.Rect(data["x0"], data["y0"], data["x1"], data["y1"])


def remove_existing_links(page: fitz.Page) -> None:
    for link in list(page.get_links()):
        try:
            page.delete_link(link)
        except Exception:
            # Some Chromium-generated link dictionaries can be incomplete.
            # The final document is rebuilt with authoritative DOM rectangles below.
            pass


def add_uri(page: fitz.Page, box: dict, href: str) -> None:
    page.insert_link({
        "kind": fitz.LINK_URI,
        "from": rect(box),
        "uri": href,
    })


def add_goto(page: fitz.Page, box: dict, target_page: int) -> None:
    page.insert_link({
        "kind": fitz.LINK_GOTO,
        "from": rect(box),
        "page": target_page,
        "to": fitz.Point(0, 0),
        "zoom": 0,
    })


def build_language(lang: str) -> dict:
    lang_dir = ROOT / lang
    metadata = json.loads((lang_dir / "links.json").read_text(encoding="utf-8"))

    merged = fitz.open()
    for page_number in range(1, 9):
        source_path = lang_dir / f"page-{page_number}.pdf"
        source = fitz.open(source_path)
        if source.page_count != 1:
            raise RuntimeError(f"{source_path} contains {source.page_count} pages, expected 1")
        merged.insert_pdf(source, links=False, annots=False)
        source.close()

    if merged.page_count != 8:
        raise RuntimeError(f"Merged {lang} document has {merged.page_count} pages")

    # Rebuild every link from the rendered DOM so there are no localhost URLs
    # and the internal navigation survives the merge.
    for page in merged:
        remove_existing_links(page)

    cover_page = merged[0]
    for item in metadata["cover"]["external"]:
        add_uri(cover_page, item["box"], item["href"])
    for item in metadata["cover"]["internal"]:
        add_goto(cover_page, item["box"], int(item["targetPage"]))

    for dossier in metadata["dossiers"]:
        page_index = int(dossier["pageIndex"])
        page = merged[page_index]
        if dossier.get("closeBox"):
            add_goto(page, dossier["closeBox"], 0)
        for item in dossier["external"]:
            add_uri(page, item["box"], item["href"])

    output_path = FINAL / OUTPUTS[lang]
    merged.set_metadata({
        "title": f"Francesco Nappi - Life is a game - {lang.upper()}",
        "author": "Francesco Nappi",
        "subject": "Interactive CV",
        "creator": "Chromium + PyMuPDF from napukisan/franappi",
        "producer": "GitHub Actions",
    })
    merged.save(output_path, garbage=4, deflate=True, clean=True)
    merged.close()

    # Structural and text validation: the decisive check for this rebuild is
    # that text remains selectable/extractable rather than flattened in images.
    check = fitz.open(output_path)
    page_sizes = []
    text_lengths = []
    link_counts = []
    missing_titles = []

    for index, page in enumerate(check):
        size = (round(page.rect.width, 2), round(page.rect.height, 2))
        page_sizes.append(size)
        text = page.get_text("text").strip()
        text_lengths.append(len(text))
        link_counts.append(len(page.get_links()))
        expected = EXPECTED_TITLES[lang][index]
        if expected.lower() not in text.lower():
            missing_titles.append({"page": index + 1, "expected": expected, "sample": text[:180]})

    if any(size != (1152.0, 648.0) for size in page_sizes):
        raise RuntimeError(f"Unexpected page sizes in {output_path}: {page_sizes}")
    if any(length < 40 for length in text_lengths):
        raise RuntimeError(f"Text extraction failed in {output_path}: {text_lengths}")
    if missing_titles:
        raise RuntimeError(f"Expected vector text missing in {output_path}: {missing_titles}")
    if sum(link_counts) < 25:
        raise RuntimeError(f"Too few links in {output_path}: {link_counts}")

    report = {
        "file": output_path.name,
        "page_count": check.page_count,
        "page_sizes_pt": page_sizes,
        "extractable_text_chars_per_page": text_lengths,
        "links_per_page": link_counts,
        "total_links": sum(link_counts),
        "file_size_bytes": output_path.stat().st_size,
    }
    check.close()
    return report


reports = [build_language("it"), build_language("en")]
(FINAL / "validation-report.json").write_text(
    json.dumps(reports, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print(json.dumps(reports, ensure_ascii=False, indent=2))
