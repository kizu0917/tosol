const fs = require('fs');
const path = require('path');

// Read the game.html file
const filePath = path.join(__dirname, 'game.html');
let content = fs.readFileSync(filePath, 'utf8');

// Video mapping for different lesson types
const videoMappings = {
  // Everyday category
  'Сайн уу': 'videos/sain_uu.mp4',
  'Баяртай': 'videos/bayartai.mp4',
  'Баярлалаа': 'videos/bayarlalaa.mp4',
  'Уучлаарай': 'videos/uuchlaarai.mp4',
  'Тийм ээ': 'videos/tiim_ee.mp4',
  
  // Hospital category
  'Өвдөлт': 'videos/ovdolt.mp4',
  'Эмч': 'videos/emch.mp4',
  'Эм': 'videos/em.mp4',
  'Тусламж': 'videos/tuslamj.mp4',
  'Хэвийн': 'videos/heviin.mp4',
  
  // Shop category
  'Худалдаж авах': 'videos/hudaldaj_avah.mp4',
  'Үнэ': 'videos/une.mp4',
  'Мөнгө': 'videos/mongu.mp4',
  'Карт': 'videos/kart.mp4',
  'Нэхэмжлэх': 'videos/nehemjleh.mp4',
  
  // School category
  'Сургалт': 'videos/surgalt.mp4',
  'Ном': 'videos/nom.mp4',
  'Дэвтэр': 'videos/devter.mp4',
  'Үзэг': 'videos/uzeg.mp4',
  'Асуулт': 'videos/asuult.mp4',
  
  // Work category
  'Ажил': 'videos/ajil.mp4',
  'Цаг': 'videos/cag.mp4',
  'Уулзалт': 'videos/uulzalt.mp4',
  'Төсөл': 'videos/tusul.mp4',
  'Амралт': 'videos/amralt.mp4'
};

// Quiz option video mappings
const quizVideoMappings = {
  // Everyday quiz options
  'Зогс': 'videos/zogs.mp4',
  'Сайн байна уу': 'videos/sain_baina_uu.mp4',
  'Тав': 'videos/tav.mp4',
  'Явах': 'videos/yavah.mp4',
  'Дуудлага': 'videos/duudlaga.mp4',
  'Хүлээж авах': 'videos/huleej_avah.mp4',
  'Зүгээр үү': 'videos/zugeer_uu.mp4',
  'Мэндлэх': 'videos/mendlah.mp4',
  'Ичгүүртэй': 'videos/ichguurtei.mp4',
  'Мэдэхгүй': 'videos/medehgui.mp4',
  'Үгүй ээ': 'videos/ugui_ee.mp4',
  'Бөгж': 'videos/bogj.mp4',
  'Сайн': 'videos/sain.mp4',
  
  // Hospital quiz options
  'Хэвийн бус': 'videos/heviin_bus.mp4',
  'Дотор муухайрах': 'videos/dotor_muuhairah.mp4',
  'Бөөлжих': 'videos/boeljih.mp4',
  'Тогооч': 'videos/togooj.mp4',
  'Механик': 'videos/mehanik.mp4',
  'Гал түймэр': 'videos/gal_tuimer.mp4',
  'Чихэр': 'videos/chihir.mp4',
  'Алим': 'videos/alim.mp4',
  'Күүки': 'videos/kuuki.mp4',
  'Ялсан': 'videos/yalsan.mp4',
  'Муу': 'videos/muu.mp4',
  
  // Shop quiz options
  'Мөнгө': 'videos/mongu.mp4',
  'Карт': 'videos/kart.mp4',
  'Нэхэмжлэх': 'videos/nehemjleh.mp4',
  'Хямд': 'videos/hiamd.mp4',
  'Үнэтэй': 'videos/untai.mp4',
  'Хямдхан': 'videos/hiamdhan.mp4',
  'Худалдаж өгөх': 'videos/hudaldaj_ogoh.mp4',
  'Худалдаж авах': 'videos/hudaldaj_avah.mp4',
  'Худалдаж өгөх': 'videos/hudaldaj_ogoh.mp4',
  'Худалдаж авах': 'videos/hudaldaj_avah.mp4',
  
  // School quiz options
  'Хичээл': 'videos/hicheel.mp4',
  'Сургалт': 'videos/surgalt.mp4',
  'Дэвтэр': 'videos/devter.mp4',
  'Ном': 'videos/nom.mp4',
  'Үзэг': 'videos/uzeg.mp4',
  'Цэг асуулт': 'videos/tsag_asuult.mp4',
  'Цэг': 'videos/tsag.mp4',
  
  // Work quiz options
  'Цамц': 'videos/tsamts.mp4',
  'Футболк': 'videos/futbolk.mp4',
  'Жинс': 'videos/jins.mp4',
  'Цагны': 'videos/cagni.mp4',
  'Секундомер': 'videos/sekundomer.mp4',
  'Таймер': 'videos/timer.mp4',
  'Баярлалаа': 'videos/bayarlalaa.mp4',
  'Зүгээр үү': 'videos/zugeer_uu.mp4',
  'Баяр хүргэе': 'videos/bayar_hurgeye.mp4',
  'Файл': 'videos/fail.mp4',
  'Файлын хайрцаг': 'videos/failiin_hairtsag.mp4',
  'Календар': 'videos/kalendar.mp4',
  'Пальм': 'videos/palm.mp4',
  'Далай': 'videos/dalai.mp4',
  'Нар': 'videos/nar.mp4'
};

// Function to update lesson data
function updateLessonData() {
  // Update lesson video paths
  Object.keys(videoMappings).forEach(title => {
    const videoPath = videoMappings[title];
    
    // Update lesson video property
    const lessonPattern = new RegExp(`(title: '${title}',\\s*emoji: '[^']*',)(\\s*description:)`, 'g');
    content = content.replace(lessonPattern, `$1\\n            video: '${videoPath}',$2`);
    
    // Update content video property
    const contentPattern = new RegExp(`(instruction: "[^"]*",\\s*steps: \\[[^\\]]*\\],\\s*)video: '[^']*'`, 'g');
    content = content.replace(contentPattern, `$1video: '${videoPath}'`);
  });
  
  // Update quiz options
  Object.keys(quizVideoMappings).forEach(text => {
    const videoPath = quizVideoMappings[text];
    
    // Update quiz option image to video
    const quizPattern = new RegExp(`(\\{ image: '[^']*', text: '${text}', correct: [^}]*\\})`, 'g');
    content = content.replace(quizPattern, `{ video: '${videoPath}', text: '${text}', correct: $1.split("correct: ")[1].split("}")[0]}`);
  });
}

// Run the update
updateLessonData();

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Successfully updated all lessons with video paths!'); 