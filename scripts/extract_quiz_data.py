
import os
import json
import glob
from docx import Document

def extract_questions_from_docx(docx_path):
    document = Document(docx_path)
    questions = []
    
    # Iterate through all tables in the document
    for table in document.tables:
        for row in table.rows:
            # Check if row has enough cells (at least 5 based on user description)
            # Column 1: Question
            # Column 2: Correct Answer
            # Column 3-5: Distractors
            
            cells = row.cells
            if len(cells) < 5:
                continue
                
            question_text = cells[0].text.strip()
            correct_answer = cells[1].text.strip()
            
            # Skip header rows or empty rows if any
            if not question_text or not correct_answer:
                continue
                
            # Collect options (Correct + Distractors)
            options = [correct_answer]
            for i in range(2, 5): # Columns 2, 3, 4 (0-indexed: 2, 3, 4) -> actually 3, 4, 5 in 1-based
                 if i < len(cells):
                     options.append(cells[i].text.strip())
            
            # Clean up options (remove empty strings)
            options = [opt for opt in options if opt]
            
            if len(options) < 2: # Need at least 2 options
                continue

            # Shuffle options so the correct answer isn't always first
            import random
            random.shuffle(options)

            questions.append({
                "question": question_text,
                "correctAnswer": correct_answer,
                "options": options 
            })
            
    return questions

def main():
    base_dir = os.getcwd()
    docx_dir = os.path.join(base_dir, 'test-docx')
    output_dir = os.path.join(base_dir, 'src', 'data')
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Map filenames to output filenames
    # 1-Kurs Sport pedagogikasi (MJM_uz_I).docx -> quiz-pedagogika.json
    # 1-Kurs Sport to'garaklarini tashkil qilish (MJM_uz_I).docx -> quiz-togarak.json
    
    files_to_process = [
        {
            "pattern": "*Sport pedagogikasi*",
            "output": "quiz-pedagogika.json",
            "title": "1-Kurs Sport Pedagogikasi"
        },
        {
            "pattern": "*Sport to'garaklarini*",
            "output": "quiz-togarak.json",
            "title": "1-Kurs Sport To'garaklarini Tashkil Qilish"
        }
    ]
    
    for item in files_to_process:
        search_pattern = os.path.join(docx_dir, item['pattern'])
        files = glob.glob(search_pattern)
        
        if not files:
            print(f"No file found for pattern: {item['pattern']}")
            continue
            
        # Take the first match
        docx_file = files[0]
        print(f"Processing: {docx_file}")
        
        try:
            questions = extract_questions_from_docx(docx_file)
            print(f"Extracted {len(questions)} questions.")
            
            output_path = os.path.join(output_dir, item['output'])
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump({
                    "title": item['title'],
                    "questions": questions
                }, f, ensure_ascii=False, indent=2)
                
            print(f"Saved to: {output_path}")
            
        except Exception as e:
            print(f"Error processing {docx_file}: {e}")

if __name__ == "__main__":
    main()
