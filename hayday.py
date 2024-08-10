import pyautogui
import time
# Wait for 3 seconds to give you time to switch to BlueStacks
time.sleep(1)

print("hello world")
print(pyautogui.position())

#top left(x=-2502, y=39)
#top right(x=-943, y=34)
#bottom left(x=-2504, y=906)
#bottom right(x=-946, y=905)

top_l=(-2500,40)
top_r=(-945,40)
bottom_l=(-2500,900)
bottom_r=(-945,900)

pyautogui.moveTo(top_l[0],top_l[1])
time.sleep(1)
pyautogui.moveTo(top_r[0],top_r[1])
time.sleep(1)
pyautogui.moveTo(bottom_l[0],bottom_l[1])
time.sleep(1)
pyautogui.moveTo(bottom_r[0],bottom_r[1])