const webdriver = require('selenium-webdriver');

const FormPage = require('../pageobjects/formPage');

describe('Test Form', ()=>{
  let driver;
  let formPage;

  before(async ()=> {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
    formPage = new FormPage(driver);
  })

  it('Form Submit Tryout', async()=>{
    const { expect } = await import('chai');

    let formfilldata = {
      name: "",
      dessert: 1,
      participate: 1,
      amount: 5,
      item: [1,2,3,4,5],
      itemdescription: "outroitem",
      allergy: "teste",
      email: "naoemail"
    }

    await formPage.get();
    await formPage.submitForm(formfilldata);


    const isError = await formPage.isErrorDisplayed(); 
    expect(isError).to.be.true;

    const errorMessage = await formPage.getErrorMessage();
    console.log(errorMessage);

  }).timeout(15000)
 

  after (async () =>{
    // await driver.quit();
  })
  
})