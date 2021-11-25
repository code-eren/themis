import sys
import time

from selenium import webdriver 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.common.keys import Keys

def register(email, upkeepName, upkeepAddr, gasLimit, startLink):
    print("registerUpkeep Called")
    options = webdriver.ChromeOptions()
    # A pre-configured google-chrome listerning on port 9222
    options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
    driver = webdriver.Chrome(options=options) 

    driver.get('https://keepers.chain.link/new')
    main_window_handle = None
    while not main_window_handle:
        main_window_handle = driver.current_window_handle

    field_email = driver.find_element_by_xpath('//*[@id="emailAddress"]')
    field_email.send_keys(email)
    field_upkeepname = driver.find_element_by_xpath('//*[@id="name"]')

    field_upkeepname.send_keys(upkeepName)
    field_upkeepAddr = driver.find_element_by_xpath('//*[@id="upkeepContract"]')
    field_upkeepAddr.send_keys(upkeepAddr)
    field_gaslimit = driver.find_element_by_xpath('//*[@id="gasLimit"]')
    field_gaslimit.send_keys(gasLimit)
    field_startLink = driver.find_element_by_xpath('//*[@id="amount"]')
    field_startLink.send_keys(Keys.CONTROL, 'a')
    field_startLink.send_keys(Keys.BACKSPACE)
    field_startLink.send_keys(startLink)

    # click submit button
    driver.find_element_by_xpath('//*[@id="__next"]/main/section[2]/div/form/div[2]/button[1]').send_keys(Keys.RETURN)

    time.sleep(5)
    print(driver.window_handles)

    metamask_window_handle = None
    while not metamask_window_handle:
        for handle in driver.window_handles:
            if handle != main_window_handle:
                metamask_window_handle = handle
                break

    driver.switch_to.window(metamask_window_handle)
    driver.find_element_by_xpath('//*[@id="app-content"]/div/div[2]/div/div[4]/div[3]/footer/button[2]').send_keys(Keys.RETURN)
    driver.switch_to.window(main_window_handle) #or driver.switch_to_default_content()

    # time.sleep(6)

    print(driver.window_handles)
    # driver.find_element_by_xpath('//*[@id="app-content"]/div/div[2]/div/div[4]/div[3]/footer/button[2]').click()

# register a keeper for a campaign from piped-in data
print(sys.argv[1])
register(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])