from selenium import webdriver

driver = webdriver.Firefox()  # or webdriver.Chrome(), depending on your browser
driver.get('https://xior-booking.com/#')

# Get a list of all cookies
cookies = driver.get_cookies()

for cookie in cookies:
    print(cookie['name'], cookie['value'])

driver.quit()
