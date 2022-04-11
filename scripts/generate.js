const fs = require('fs');
const path = require('path');

const {
    difficultyMap,
    languages,
} = require('./config');

const extLabelMap = languages.reduce((obj, { label, ext, }) => {
    obj[ext] = label;
    return obj;
}, {});

const questions = require('./question.json');

const fileList = fs.readdirSync(path.join(__dirname, '../src'));

const answersMap = fileList.reduce((obj, dirName) => {
    const answers = fs.readdirSync(path.join(__dirname, '../src', dirName));
    obj[dirName.split('.')[0]] = answers;
    return obj;
}, {});

// 过滤题目
const mergedQuestions = questions.filter(({index}) => answersMap[index]).map(({
    index,
    title,
    difficulty,
}) => {
    const answers = (answersMap[index] || []).filter((answerFileName) => {
        const ext = answerFileName.split('.').pop();
        return extLabelMap[ext];
    }).map((answerFileName) => {
        const name = answerFileName.split('.');
        const ext = name.pop();
		const type = name.pop();
		// md文档格式特殊处理
		const label = ext === 'md' ? extLabelMap[type] : extLabelMap[ext]
        return `[${label}](./src/${name.join('.')}/${answerFileName})`;
    }).join(' ');

    return `| ${index} | ${title} | ${answers} |${difficultyMap[difficulty]}  |`;
}).join('\n');

const prefix = fs.readFileSync(path.join(__dirname, './_prefix.md'), 'utf8');

fs.writeFile(path.join(__dirname, '../README.md'), prefix + mergedQuestions + '\n', 'utf8', (err) => {
    if (err) throw err;
    console.log('文件已被保存');
});
