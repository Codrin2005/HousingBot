const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

async function findingNemoRP(city) {
    const url = "https://www.roomplaza.com/";
    let driver;
    try {
        // Set up Chrome options
        const options = new chrome.Options();

        options.addArguments("--disable-extensions");

        // Build the WebDriver instance with ChromeDriver
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        // Navigate to the URL
        await driver.get(url);
        // Introduce a short delay
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const { Select } = require("selenium-webdriver/lib/select");
        let citiesss = await driver.findElements(By.id("city"));
        let cities = await citiesss[1];
        console.log(citiesss.length);

        if ((await cities.getTagName()) !== "select") {
            console.log("Tag is " + (await cities.getTagName())); // + cities.getTagName());the
        } else {
            let js =
                "arguments[0].style.height='auto'; arguments[0].style.visibility='visible';";

            driver.executeScript(js, cities);
            let dropdown = driver.findElement(By.className("dropdown"));
            dropdown.click();
            let options = await dropdown.findElement(By.css("ul"));
            let option = await options.findElement(
                By.xpath(`//*[text()[contains(., '${city}')]]`)
            );

            // const select = new Select(cities);
            // await select.selectByVisibleText(city);

            let searchButton = await driver.findElement(By.id("submit"));
            await searchButton.click();

            // Wait until apartments are loaded
            await driver.wait(
                until.elementsLocated(By.className("apartment")),
                10000
            );

            let apartments = await driver.findElements(
                By.className("apartment")
            );

            console.log(apartments.length);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

(async function test() {
    await findingNemoRP("Delft");
})();
