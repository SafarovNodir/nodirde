const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/devdev';

const dict = {
  'Orqaga qaytish': '<span data-lang-uz>Orqaga qaytish</span><span data-lang-ru style="display:none;">Назад</span><span data-lang-en style="display:none;">Go back</span>',
  'Loyiha haqida': '<span data-lang-uz>Loyiha haqida</span><span data-lang-ru style="display:none;">О проекте</span><span data-lang-en style="display:none;">About the project</span>',
  'Xususiyatlar': '<span data-lang-uz>Xususiyatlar</span><span data-lang-ru style="display:none;">Особенности</span><span data-lang-en style="display:none;">Features</span>',
  'Texnologiyalar': '<span data-lang-uz>Texnologiyalar</span><span data-lang-ru style="display:none;">Технологии</span><span data-lang-en style="display:none;">Technologies</span>',
  'Buyurtma berish': '<span data-lang-uz>Buyurtma berish</span><span data-lang-ru style="display:none;">Заказать</span><span data-lang-en style="display:none;">Order</span>',
  'Bosh sahifaga qaytish': '<span data-lang-uz>Bosh sahifaga qaytish</span><span data-lang-ru style="display:none;">Вернуться на главную</span><span data-lang-en style="display:none;">Back to home</span>',
  'Barcha huquqlar himoyalangan.': '<span data-lang-uz>Barcha huquqlar himoyalangan.</span><span data-lang-ru style="display:none;">Все права защищены.</span><span data-lang-en style="display:none;">All rights reserved.</span>'
};

const scriptToInject = `
const savedTheme = localStorage.getItem('nd-theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('nd-lang') || 'uz';
  document.querySelectorAll('[data-lang-uz], [data-lang-ru], [data-lang-en]').forEach(el => el.style.display = 'none');
  document.querySelectorAll(\`[data-lang-\${lang}]\`).forEach(el => el.style.display = '');
});
`;

for (let i = 1; i <= 6; i++) {
  const file = path.join(dir, `project-${i}.html`);
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace script
    content = content.replace(/const savedTheme[\s\S]*?setAttribute\('data-theme', savedTheme\);/, scriptToInject.trim());
    
    // Fixed dictionary matches
    for (const [key, value] of Object.entries(dict)) {
      content = content.replace(key, value);
    }
    
    // Replace index.html with index.html to fix links
    content = content.replace(/href="index\.html/g, 'href="index.html');

    fs.writeFileSync(file, content);
    console.log(`Processed project-${i}.html`);
  }
}
