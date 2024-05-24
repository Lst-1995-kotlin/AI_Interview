const puppeteer =require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless:false
  });
  const page = await browser.newPage();
  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Navigate the page to a URL
  await page.goto('https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=48112483&recommend_ids=eJw9zMENwDAIQ9GVIDjYTJNFMnyp0vT4ZH1DI0zQkttGowg2suE5mLXKxgZFWnkv%2Fi6AKi48vXiALoQ4jZyu%2BN%2FYd%2FoamxBwQM1OLgqKaS8eP7wk8Q%3D%3D&view_type=avatar&rec_scn_id=810&referPage=y&refDpId=SRI_100_MAIN_AI_RCT_LOGOUT&gz=1&t_ref_scnid=810&t_ref_content=SRI_100_MAIN_AI_RCT_LOGOUT&refer=y&t_ref=main&t_category=relay_view&t_content=relay_view_avatar&inner_source=saramin&inner_medium=pattern&inner_campaign=relay_view_2&inner_term=avatar&referNonce=fd41309564d02595acc8&relayNonce=fd41309564d02595acc8&immediately_apply_layer_open=n#seq=1');
  await new Promise(resolve=>setTimeout(resolve,5000))
  const content = await page.content()
  const $ = cheerio.load(content)
  var text=$(".const_simply").text();
console.log(text)
//   const lists = $("#prduct_list_area > li");
//   const temp = ""
//   lists.each((index, list) => {
//     temp += $(list).find("body > div > div.cont_simply").text();
//   })
//   console.log(temp)
  

//   var textSelector=await page.waitForSelector("body")
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);
//   console.log(fullTitle.replace(/ /g,""))
  // Type into search box
//   await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
//   const searchResultSelector = '.devsite-result-item-link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

  // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();