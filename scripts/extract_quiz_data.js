
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const cheerio = require('cheerio');

async function extractQuestionsFromDocx(docxPath) {
  const result = await mammoth.convertToHtml({ path: docxPath });
  const html = result.value;
  const $ = cheerio.load(html);

  const questions = [];

  $('table').each((tableIndex, table) => {
    $(table).find('tr').each((rowIndex, row) => {
      const cells = $(row).find('td');

      // We expect at least 5 cells: Question | Correct Answer | Distractor 1 | Distractor 2 | Distractor 3
      if (cells.length < 5) return;

      const questionText = $(cells[0]).text().trim();
      const correctAnswer = $(cells[1]).text().trim();

      if (!questionText || !correctAnswer) return;

      const options = [correctAnswer];

      // Iterate through distractors (columns 2, 3, 4 -> 0-indexed: 2, 3, 4)
      for (let i = 2; i < 5; i++) {
        const distractor = $(cells[i]).text().trim();
        if (distractor) {
          options.push(distractor);
        }
      }

      if (options.length < 2) return;

      // Shuffle options using Fisher-Yates algorithm
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      questions.push({
        question: questionText,
        correctAnswer: correctAnswer,
        options: options
      });
    });
  });

  return questions;
}

async function main() {
  const baseDir = process.cwd();
  const docxDir = path.join(baseDir, 'test-docx');
  const outputDir = path.join(baseDir, 'src', 'data');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filesToProcess = [
    {
      pattern: 'Sport pedagogikasi',
      output: 'quiz-pedagogika.json',
      title: '1-Kurs Sport Pedagogikasi'
    },
    {
      pattern: "Sport to'garaklarini",
      output: 'quiz-togarak.json',
      title: "1-Kurs Sport To'garaklarini Tashkil Qilish"
    },
    {
      pattern: "Jismoniy tarbiya",
      output: "quiz-jismoniy-tarbiya.json",
      title: "1-Kurs Jismoniy Tarbiya va Sport Jismoniy tarbiya va sport sohasida ilmiy faoliyatni tashkil qilish"
    },
    {
      pattern: "Ilmiy tadqiqot",
      output: "quiz-metodologiya.json",
      title: "1-Kurs Ilmiy Tadqiqot Metodologiyasi"
    }
  ];

  const allFiles = fs.readdirSync(docxDir);

  for (const item of filesToProcess) {
    const matchingFiles = allFiles.filter(file => {
      // Ignore hidden files (starting with .) or temp/lock files
      return file.includes(item.pattern) && file.endsWith('.docx') && !file.startsWith('.') && !file.startsWith('~');
    });

    if (matchingFiles.length === 0) {
      console.log(`No file found for pattern: ${item.pattern}`);
      continue;
    }

    // Take the first match
    const docxFile = path.join(docxDir, matchingFiles[0]);
    console.log(`Processing: ${docxFile}`);

    try {
      const questions = await extractQuestionsFromDocx(docxFile);
      console.log(`Extracted ${questions.length} questions.`);

      const outputPath = path.join(outputDir, item.output);

      fs.writeFileSync(outputPath, JSON.stringify({
        title: item.title,
        questions: questions
      }, null, 2), 'utf-8');

      console.log(`Saved to: ${outputPath}`);
    } catch (error) {
      console.error(`Error processing ${docxFile}:`, error);
    }
  }
}

main().catch(console.error);
