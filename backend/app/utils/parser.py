import spacy
import fitz  # PyMuPDF
import docx
import re

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")


def parse_resume(file_path):
    """
    Parses the resume to extract text, skills, email, and name.
    """
    text = extract_text(file_path)
    doc = nlp(text)

    # Extract skills using named entities (customize as needed)
    skills = [ent.text for ent in doc.ents if ent.label_ in ["SKILL", "ORG", "PRODUCT", "TECH"]]

    # Fallback regex patterns for email and name
    email = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    name_match = re.search(r"(?i)(?:Name|NAME)[:\-]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", text)

    # Clean and deduplicate skills
    skills = list(set(skill.strip() for skill in skills if len(skill.strip()) > 1))

    return {
        "text": text,
        "skills": skills,
        "email": email.group(0) if email else None,
        "name": name_match.group(1) if name_match else None
    }


def extract_text(file_path):
    """
    Extracts text from a file (PDF or DOCX).
    """
    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX are supported.")


def extract_text_from_pdf(file_path):
    """
    Extracts text from a PDF file using PyMuPDF.
    """
    try:
        doc = fitz.open(file_path)
        return "\n".join([page.get_text() for page in doc])
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""


def extract_text_from_docx(file_path):
    """
    Extracts text from a DOCX file using python-docx.
    """
    try:
        doc = docx.Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print(f"Error extracting text from DOCX: {e}")
        return ""