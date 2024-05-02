const { By, until } = require('selenium-webdriver');

class FormPage {
    constructor(driver){
        this.driver = driver;
        this.nameInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input") 
        this.submitButton = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[3]/div[1]/div[1]/div")
        this.listSelector = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]")
        this.listItems = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[2]")
        this.radioItems = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[3]/div/div/div[2]/div[1]/div/span/div")
        this.radioCleanSelection = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[3]/div/div/div[2]/div[2]/div/div")
        this.peopleAmountInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div[1]/div/div[1]/input")
        this.dishesInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[5]/div/div/div[2]/div[1]")
        this.dishesOthersInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[5]/div/div/div[2]/div[1]/div[6]/div/div/div/div/div[1]/input")
        this.allergyInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[1]/input")
        this.emailInput = By.xpath("//*[@id='mG61Hd']/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[1]/input")
    }

    async get() {
        await this.driver.get('https://docs.google.com/forms/d/e/1FAIpQLSfErxd9vjo-CUulmhGsLBaX6G48qm94mKwRG5G0yBC7-10LCQ/viewform')
    }

    async submitForm(data) {

        if (data.name.length > 0){
            await this.driver.findElement(this.nameInput).sendKeys(data.name);
        }

        if (data.dessert > 0) {
            await this.driver.findElement(this.listSelector).click();
            let dessertSelector = await this.driver.wait(until.elementLocated(this.listSelector), 15000);

            await this.driver.sleep(500);
            let allDesserts = await dessertSelector.findElements(By.xpath("//div[@role='option']//span"));
            let selectedDessert = allDesserts[data.dessert];

            await this.driver.executeScript('arguments[0].click()', selectedDessert);
            await this.driver.sleep(500);
        }

        if (data.participate > 0){

            let radioSelector = await this.driver.wait(until.elementLocated(this.listSelector), 15000);
            
            let allRadioItems = await radioSelector.findElements(By.xpath("//div[@class='nWQGrd zwllIb']//div[@class='bzfPab wFGF8']"));
            let selectedRadio = await allRadioItems[data.participate-1];

            await selectedRadio.click();
        }

        if (data.amount > 0){
            await this.driver.findElement(this.peopleAmountInput).sendKeys(data.amount);

        }
        if (data.item.length > 0){

            const dishesSelector = await this.driver.wait(until.elementLocated(this.dishesInput), 15000);

            let allDishes = await dishesSelector.findElements(By.xpath("//div[@class='Y6Myld']//span"));

        
            for (let dish of data.item){
                await allDishes[dish].click()
            }
        }   
        if (data.item.includes(5) && data.itemdescription.length > 0){
            await this.driver.findElement(this.dishesOthersInput).sendKeys(data.itemdescription);
        }
        if (data.allergy.length > 0){
            await this.driver.findElement(this.allergyInput).sendKeys(data.allergy);
        }   
        if (data.email.length > 0){
            await this.driver.findElement(this.emailInput).sendKeys(data.email);
        } 



        await this.driver.findElement(this.submitButton).click();
    }

    async isErrorDisplayed() {
        try {
            await this.driver.findElement(By.xpath('//*[@id="i48"]/span')).isDisplayed();
            return true; 
        } catch (error) {
            return false;
        }
    }
    
    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(By.xpath('//*[@id="i48"]/span'), 5000);
            return await errorElement.getText(); 
        } catch (error) {
            return null; 
        }
    }
}

module.exports = FormPage




