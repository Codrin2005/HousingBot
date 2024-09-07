const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

let isGetListingsRunning;

async function acceptCookies(driver) {
    try {
        const button = await driver.findElement(
            By.id("onetrust-accept-btn-handler")
        );
        await button.click();
        return driver;
    } catch (error) {
        console.log("error acceptCookies Funda: ", error);
    }
    return driver;
}

async function getListings(driver) {
    isGetListingsRunning = true;
    let hrefs = [];
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const listdiv = await driver.findElement(By.className("search-list"));
        const list = await listdiv.findElements(
            By.className("listing-search-item__link listing-search-item__link--depiction")
        );
        const hrefs = await Promise.all(list.map(async (element) => {
            return await element.getAttribute("href");
        }));
        //console.log("Found on this page:\n" + hrefs + "\n");
        return hrefs;
    } catch (error) {
        console.log("error getListings Plaza: ", error);
    }
    return hrefs;
}

async function findingDory(city, hrefs) {
    const fs = require("fs").promises;
    const filePath = "./Bots/Funda/Funda_" + city + "_ids.txt";
    try{
        await fs.access(filePath, fs.constants.F_OK);
        console.log("File already exists.");
    }
    catch(err){
        // File does not exist, create it
        await fs.writeFile(filePath, "", (err, fd) => {
            if (err) {
                console.error("Error creating file:", err);
            } else {
                fs.close(fd, (err) => {
                    if (err) {
                        console.error("Error closing file:", err);
                    } else {
                        console.log("File created successfully!");
                    }
                });
            }
        });
    }
    let oldHrefs = [];
    try{
        const data = await fs.readFile(filePath, "utf8");
        oldHrefs = data.split(/\s+/);
        //console.log("Had " + oldHrefs.length + " listings from previous search:\n" + oldHrefs);
    }
    catch(err){
        console.error("Error reading file:", err);
    }

    console.log("\n\n\n");

    let newListings = [];
    let data = "";
    for (let i = 0; i < hrefs.length; i++){
        if (!oldHrefs.includes(hrefs[i])) {
            newListings.push(hrefs[i]);
        }
        data += hrefs[i] + " ";
    }

    //console.log("About to write to file:\n" + data);

    await fs.writeFile(filePath, data, "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File written successfully!");
        }
    });
    return newListings;
}

async function findingNemoFunda(city) {
    const url =
        "https://www.huurwoningen.com/in/" + city;
    let driver;
    isGetListingsRunning = false;

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
        await new Promise((resolve) => setTimeout(resolve, 500));
        driver = await acceptCookies(driver);
        
        let div = await driver.findElements(
            By.className("pagination__list")
        );

        let hrefs = [];

        if (div.length > 0){
            let pageList = div[0];
            let pages = await pageList.findElements(By.className("pagination__item"));
            let n = Number(await(await(pages[pages.length - 2].findElement(By.className("pagination__link"))).getAttribute("data-page")));
            hrefs = await getListings(driver);
            isGetListingsRunning = false;

            for (let i = 2; i<=n; i++){
                //console.log("ITERATION NO. " + i);
                div = await driver.findElement(
                    By.className("pagination__list")
                );
                button = await div.findElement(By.className("pagination__item pagination__item--next"));
                while(isGetListingsRunning == true){}
                await button.click();
                await new Promise((resolve) => setTimeout(resolve, 1000));
                let pageHrefs = await getListings(driver);
                for(link in pageHrefs){
                    hrefs.push(pageHrefs[link]);
                }
                isGetListingsRunning = false;
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            return findingDory(city, hrefs);
        }
        hrefs = await getListings(driver);

        return findingDory(city, hrefs);
    } catch (error) {
        console.error("Error findingNemoFunda Funda:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}
module.exports = {findingNemoFunda};

(async function testP() {
    let result = await findingNemoFunda("den-haag");
    console.log("new listings: " + result.length);
})();