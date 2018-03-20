#!/usr/bin/env/ node

const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();
const templatePath = `${__dirname}/template/`;

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];


inquirer.prompt(QUESTIONS)
  .then(answers => {
	const projectName = answers['project-name'];
	
	try{
		fs.mkdirSync(`${CURR_DIR}/${projectName}`);
		createDirectoryContents(templatePath, projectName);
	}
	catch(err){
		console.log(`ERROR: Project "${projectName}" already exists, try another name`);
	};
    
});

function createDirectoryContents (templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}