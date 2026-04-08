import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'AIzaSyBJXqY8v5lYcODDhB6jI_J2Vl_NEh53VFs';
const OUTPUT_DIR = './public/assets/products';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const products = [
  { id: '1',  name: 'exalt-navy-hoodie',       prompt: 'product photography, navy blue hoodie with small white eXalt logo on chest, folded neatly, pure white background, professional studio lighting, e-commerce style, 4:3 ratio' },
  { id: '2',  name: 'exalt-classic-tshirt',     prompt: 'product photography, white t-shirt with small navy blue eXalt logo on chest, folded neatly, pure white background, professional studio lighting, e-commerce style' },
  { id: '3',  name: 'exalt-polo-navy',          prompt: 'product photography, navy blue polo shirt with small white eXalt logo embroidered on chest, white background, professional studio lighting, clean minimal' },
  { id: '4',  name: 'exalt-navy-sweatshirt',    prompt: 'product photography, dark navy blue crewneck sweatshirt with small eXalt logo, folded, white background, professional studio lighting, e-commerce' },
  { id: '5',  name: 'exalt-logo-cap',           prompt: 'product photography, navy blue baseball cap with eXalt logo embroidered in white, side view, white background, studio lighting, minimal' },
  { id: '6',  name: 'exalt-tote-bag',           prompt: 'product photography, natural canvas tote bag with eXalt navy blue logo print, standing upright, white background, studio lighting, clean e-commerce' },
  { id: '7',  name: 'exalt-premium-backpack',   prompt: 'product photography, sleek navy blue backpack with subtle eXalt logo, standing upright, white background, professional studio lighting' },
  { id: '8',  name: 'exalt-laptop-sleeve',      prompt: 'product photography, dark navy blue laptop sleeve 15 inch with small eXalt logo in white, flat lay on white background, minimal studio lighting' },
  { id: '9',  name: 'exalt-notebook-a5',        prompt: 'product photography, hardcover A5 notebook navy blue with eXalt logo in gold on cover, slight angle, white background, studio lighting, premium stationery' },
  { id: '10', name: 'exalt-pen-set',            prompt: 'product photography, set of 3 premium pens in navy blue and white with eXalt logo, arranged neatly, white background, studio lighting, stationery' },
  { id: '11', name: 'exalt-travel-mug',         prompt: 'product photography, navy blue travel mug with white eXalt logo, standing upright, white background, professional studio lighting, clean minimal' },
  { id: '12', name: 'exalt-sticker-pack',       prompt: 'product photography, collection of branded stickers with eXalt logo in navy, pink and yellow colors, spread on white background, top down view, minimal' },
  { id: '13', name: 'exalt-flow-hoodie',        prompt: 'product photography, premium navy blue hoodie with eXalt x Flow co-branding logo in pink and white, limited edition tag, white background, studio lighting' },
  { id: '14', name: 'exalt-pink-cap',           prompt: 'product photography, pink baseball cap with white eXalt logo embroidered, limited edition, side view, white background, studio lighting, trendy' },
  { id: '15', name: 'exalt-gold-notebook',      prompt: 'product photography, premium hardcover notebook with gold foil eXalt logo on navy cover, luxury stationery, white background, professional studio lighting' },
  { id: '16', name: 'exalt-heritage-tshirt',    prompt: 'product photography, vintage style navy t-shirt with eXalt heritage logo graphic in yellow and white, folded, white background, studio lighting' },
  { id: '17', name: 'exalt-polo-pink',          prompt: 'product photography, pink polo shirt with small navy eXalt logo embroidered, white background, professional studio lighting, clean minimal' },
  { id: '18', name: 'exalt-conference-bag',     prompt: 'product photography, navy professional conference tote bag with eXalt logo in white, structured shape, white background, studio lighting' },
];

async function generateImage(product) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: product.prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const parts = json.candidates?.[0]?.content?.parts;
          const imgPart = parts?.find(p => p.inlineData?.mimeType?.startsWith('image/'));
          if (imgPart) {
            const imgBuffer = Buffer.from(imgPart.inlineData.data, 'base64');
            const filePath = path.join(OUTPUT_DIR, `${product.name}.png`);
            fs.writeFileSync(filePath, imgBuffer);
            console.log(`✅ ${product.name}`);
            resolve(`/assets/products/${product.name}.png`);
          } else {
            console.error(`❌ ${product.name}:`, JSON.stringify(json).slice(0, 300));
            resolve(null);
          }
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('🎨 Generating eXalt product images with Gemini Imagen 3...\n');
  const results = [];

  for (const product of products) {
    const imgPath = await generateImage(product);
    results.push({ id: product.id, path: imgPath });
    await new Promise(r => setTimeout(r, 1000)); // rate limit
  }

  // Update db.json
  const db = JSON.parse(fs.readFileSync('./src/data/db.json', 'utf8'));
  results.forEach(({ id, path: imgPath }) => {
    if (imgPath) {
      const p = db.products.find(p => p.id === id);
      if (p) p.image = imgPath;
    }
  });
  fs.writeFileSync('./src/data/db.json', JSON.stringify(db, null, 2));

  const success = results.filter(r => r.path).length;
  console.log(`\n✨ Done — ${success}/${products.length} images generated`);
}

main().catch(console.error);
