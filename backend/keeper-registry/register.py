import time
import os

from selenium import webdriver 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.common.keys import Keys

options = webdriver.ChromeOptions()
# A pre-configured google-chrome listerning on port 9222
options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
# options.add_extension('/mnt/c/users/16073/desktop/clhackathon/themis/backend/nkbihfbeogaeaoehlefnkodbefgpgknn-10.5.2-Crx4Chrome.com.crx')
driver = webdriver.Chrome(executable_path="/Users/rodrigotaipe/Downloads/chromedriver", options=options) 

driver.get('https://keepers.chain.link/new')
main_window_handle = None
while not main_window_handle:
    main_window_handle = driver.current_window_handle
email = "wuzhengxun@outlook.com"
upkeepName = "dataKeeper"
upkeepAddr = "0x016d6953cFC0af7e1282b3B9b5d3a0eAAB15bf27"
gasLimit = 200000
startLink = 20
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



