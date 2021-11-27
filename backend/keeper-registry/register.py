import sys
import time

from selenium import webdriver 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.common.keys import Keys

def register(email, upkeepName, upkeepAddr, gasLimit, startLink):
    from selenium.common.exceptions import NoSuchElementException        
    def check_exists_by_xpath(xpath):
        try:
            driver.find_element_by_xpath(xpath)
        except NoSuchElementException:
            return False
        return True
    # print("registerUpkeep Called")
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
    # print(driver.window_handles)

    retry = 6
    metamask_window_handle = None
    while retry > 0 and not metamask_window_handle:
        time.sleep(5)
        retry-=1
        for handle in driver.window_handles:
            if handle != main_window_handle:
                metamask_window_handle = handle
                break
    if not metamask_window_handle:
        return
    driver.switch_to.window(metamask_window_handle)
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="app-content"]/div/div[2]/div/div[4]/div[3]/footer/button[2]').send_keys(Keys.RETURN)
    driver.switch_to.window(main_window_handle) #or driver.switch_to_default_content()

    # wait 15 second to see whether tx is confirmed
    # TODO identify the existence of the element
    # time.sleep(15)
    # wait there's a view upkeep button
    retry = 6
    while retry > 0 and not check_exists_by_xpath('/html/body/div[5]/div/div/div/button[2]'):
        time.sleep(5)
        retry-=1
        continue

    time.sleep(2)
    if not check_exists_by_xpath('/html/body/div[5]/div/div/div/button[2]'):
        return

    # click the view upkeep button
    driver.find_element_by_xpath('/html/body/div[5]/div/div/div/button[2]').send_keys(Keys.RETURN)
    
    time.sleep(2)

    upkeepId = driver.find_element_by_xpath('//*[@id="__next"]/main/section[3]/dl/div/div[1]/dd').text
    print(upkeepId)
    # print(driver.window_handles)
    # driver.find_element_by_xpath('//*[@id="app-content"]/div/div[2]/div/div[4]/div[3]/footer/button[2]').click()


# register a keeper for a campaign from piped-in data
# print(sys.argv[1])
register(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])