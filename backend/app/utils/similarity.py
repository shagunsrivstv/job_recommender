from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def match_jobs(resume_text, job_df):
    job_texts = job_df["description"].tolist()
    combined = [resume_text] + job_texts
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(combined)
    sim_scores = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    job_df["similarity"] = sim_scores
    return job_df.sort_values(by="similarity", ascending=False)
