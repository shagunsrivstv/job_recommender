import spacy
import fitz
import docx
import re

nlp = spacy.load("en_core_web_sm")


def parse_resume(file_path):
    text = extract_text(file_path)
    doc = nlp(text)

    # Extract skills using named entities (you can customize this further)
    skills = [ent.text for ent in doc.ents if ent.label_ in ["SKILL", "ORG", "PRODUCT", "TECH"]]

    # Fallback regex patterns for name/email (not always 100% accurate)
    email = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    name_match = re.findall(r"(?i)(?:Name|NAME)[:\-]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", text)

    return {
        "text": text,
        "skills": ", ".join(set(skills)),
        "email": email.group(0) if email else None,
        "name": name_match[0] if name_match else None
    }


def extract_text(path):
    if path.endswith(".pdf"):
        doc = fitz.open(path)
        return "\n".join([page.get_text() for page in doc])
    elif path.endswith(".docx"):
        doc = docx.Document(path)
        return "\n".join([para.text for para in doc.paragraphs])
    return ""
