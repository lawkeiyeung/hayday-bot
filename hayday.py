import pyautogui
import time
import mss
import numpy as np
import tkinter as tk
import math
from PIL import Image

x_coor=(446,716,960,1230,1510)
y_coor=(490,750)
sold_x=(389,647,913,1173,1430)
sold_y=(533,814)
market_topleft=(577,314)
market_maxitem=(1561,306)
market_maxprice=(1460,548)
market_sell=(1367,963)
def get_rgb_at_mouse():
    # Get the current mouse position
    mouse_x, mouse_y = pyautogui.position()

    # Define the area to capture around the mouse (1x1 pixel)
    monitor = {
        "top": mouse_y-25,
        "left": mouse_x-25,
        "width": 50,
        "height": 50
    }

    # Capture the area around the mouse
    with mss.mss() as sct:
        screenshot = sct.grab(monitor)
        bgrx_array = np.array(screenshot)
        img = Image.frombytes('RGB', screenshot.size, screenshot.bgra, 'raw', 'BGRX')
        #img.show()

    # Extract the RGB value from the image array
    # image_array[0][0] gets the color of the pixel (y=0, x=0) of the captured area
    image_array = np.zeros_like(bgrx_array)
    image_array[..., :3] = bgrx_array[..., 2::-1]
    image_array[..., 3] = bgrx_array[..., 3]
    rgb = average_color(image_array)

    return tuple(rgb)

def move_mouse_in_circle(center_x, center_y, radius, duration, speed=0.01):
    """
    Moves the mouse in a circular path around a center point.

    Args:
        center_x (int): X-coordinate of the center of the circle.
        center_y (int): Y-coordinate of the center of the circle.
        radius (int): Radius of the circular path.
        duration (float): Time in seconds to complete one full circle.
        speed (float): Time in seconds between position updates.
    """
    start_time = time.time()
    end_time = start_time + duration

    while time.time() < end_time:
        # Calculate the current angle based on elapsed time
        elapsed_time = time.time() - start_time
        angle = (elapsed_time / duration) * 2 * math.pi

        # Calculate x and y positions
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)

        # Move the mouse to the calculated position
        pyautogui.moveTo(x, y)

        # Wait for a short duration before the next move
        time.sleep(speed)

def get_screen_dpi():
    root = tk.Tk()
    root.withdraw()  # Hide the root window
    dpi = root.winfo_fpixels('1i')  # Get the DPI (dots per inch)
    return dpi

# Convert cm to pixels
def cm_to_pixels(cm, dpi):
    return int(cm * dpi / 2.54)

# Main function to move the mouse
def move_mouse_left_cm(cm):
    # Get the screen DPI
    dpi = get_screen_dpi()

    # Convert 5 cm to pixels
    pixels = cm_to_pixels(cm, dpi)

    # Get current mouse position
    current_x, current_y = pyautogui.position()

    # Move the mouse to the left
    pyautogui.moveTo(current_x - pixels, current_y, duration=0.1)

def move_mouse_up_cm(cm):
    # Get the screen DPI
    dpi = get_screen_dpi()

    # Convert 5 cm to pixels
    pixels = cm_to_pixels(cm, dpi)

    # Get current mouse position
    current_x, current_y = pyautogui.position()

    # Move the mouse to the left
    pyautogui.moveTo(current_x , current_y+ pixels)


def top_left():
    for i in range(2):
        pyautogui.moveTo(402, 191)
        pyautogui.mouseDown()
        pyautogui.moveTo(1702+i*10, 703, duration=0.05)
        pyautogui.mouseUp()

    time.sleep(0.3)
    pyautogui.moveTo(430, 190)
    pyautogui.mouseDown()
    pyautogui.moveTo(1400, 300, duration=0.1)
    pyautogui.mouseUp()

def find_the_farm():
    """
    time.sleep(0.3)
    pyautogui.moveTo(1326, 90)
    pyautogui.mouseDown()
    pyautogui.moveTo(693, 90, duration=0.5)
    time.sleep(0.3)
    pyautogui.mouseUp()

    pyautogui.moveTo(1233, 643)
    pyautogui.mouseDown()
    pyautogui.moveTo(1233, 69, duration=0.5)
    time.sleep(0.3)
    pyautogui.mouseUp()
    """
    time.sleep(0.3)
    point_farm()

def shop():
    time.sleep(0.1)
    top_left()
    time.sleep(0.1)
    find_the_market()
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    for market_y in y_coor:
        for market_x in x_coor:
            print()
            print(f"moving to {market_x, market_y}")
            pyautogui.moveTo(market_x, market_y)
            time.sleep(0.1)
            pyautogui.click()

            pyautogui.moveTo(1317, 119)
            time.sleep(0.1)
            R,G,B,A = get_rgb_at_mouse()

            print(f"market {market_x, market_y} rbg {R,G,B,A}")
            if (R==231 and G==61 and B==70):
                print(f"market {market_x, market_y} selling")
                pyautogui.click()
            else:
                pyautogui.moveTo(703, 233)
                R,G,B,A = get_rgb_at_mouse()
                time.sleep(0.1)
                #empty box
                if(R==254 and G== 247 and B==219):
                    pyautogui.moveTo(1620,104)
                    time.sleep(0.1)
                    pyautogui.click()

    pyautogui.moveTo(1490, 490)
    time.sleep(0.1)
    pyautogui.click()

    pyautogui.moveTo(1317, 119)
    R,G,B,A = get_rgb_at_mouse()
    if (R==231 and G==61 and B==70):
        pyautogui.moveTo(1157, 491)
        time.sleep(0.1)
        pyautogui.click()

        pyautogui.moveTo(1093, 726)
        R,G,B,A = get_rgb_at_mouse()
        time.sleep(0.1)
        pyautogui.click()
        print(f"ad rgb {R,G,B,A}")
        #no ad (205, 205, 205, 255)
        #ad (220, 172, 78, 255)
        if (G>200 and B>200 or R==162 and G==133 and B==60):
            pyautogui.moveTo(1318, 117)
            time.sleep(0.1)
            pyautogui.click()
        else:
            pyautogui.moveTo(1318, 120)
            time.sleep(0.1)
            pyautogui.click()
    else:
        pyautogui.moveTo(1620, 104)
        time.sleep(0.1)
        pyautogui.click()

    #exit market
    pyautogui.moveTo(1552, 129)
    time.sleep(0.1)
    pyautogui.click()

def find_the_market():
    pyautogui.moveTo(533, 443)
    pyautogui.mouseDown()
    pyautogui.moveTo(533, 50, duration=0.5)
    pyautogui.mouseUp()
    point_market()

def point_farm():
    pyautogui.moveTo(1114,791)
def point_market():
    pyautogui.moveTo(848, 733)
# Wait for 3 seconds to give you time to switch to BlueStacks
def average_color(image_array):
        """
        Calculates the average color of the image.

        Args:
            image_array (numpy.ndarray): The image data as a numpy array with shape (height, width, channels).

        Returns:
            tuple: The average color as (R, G, B, A).
        """
        # Check if the image has an alpha channel
        if image_array.shape[2] == 4:
            # Sum the pixel values for each channel
            sum_values = np.sum(image_array, axis=(0, 1))
            # Number of pixels
            num_pixels = image_array.shape[0] * image_array.shape[1]
            # Calculate the average color
            average = sum_values / num_pixels
            return tuple(average.astype(int))  # Convert to integer values
        else:
            raise ValueError("Image does not have 4 channels (RGBA)")

def wheat_status(image=1):
    area_size=200
    x, y = pyautogui.position()
    farmingland = {
        "top": y- area_size // 2,
        "left": x- area_size // 2,
        "width": area_size,
        "height": area_size
    }

    with mss.mss() as sct:
        screenshot = sct.grab(farmingland)
        bgrx_array = np.array(screenshot)
        img = Image.frombytes('RGB', screenshot.size, screenshot.bgra, 'raw', 'BGRX')
    if image==1:
        img.show()

    # Get the average color of the entire image
    image_array = np.zeros_like(bgrx_array)
    image_array[..., :3] = bgrx_array[..., 2::-1]
    image_array[..., 3] = bgrx_array[..., 3]
    avg_color = average_color(image_array)
    print("Average color (R, G, B, A):", avg_color)

    R,G,B,A=avg_color
    #(174, 91, 34, 255)
    if(R>200 and G>200 and B>200):
        return -1
    elif(G<110):
        print("land")
        return 0
    #(137, 123, 29, 255)
    elif(G>110 and G<140 ):
        print("phase 1")
        return 1
    #(136, 154, 32, 255)
    elif(G>140 and G<180 ):
        print("phase 2")
        return 1
    #(153, 190, 38, 255)
    elif(G>180 and G<190 ):
        print("phase 3, almost")
        return 1
    #(252, 220, 15, 255)
    elif(R>200 and G>190):
        print("wheat!!")
        return 2

def cut_and_plant(status,status1_count):
    if status==1:
        if status1_count<40:
            return -1
        else:
            status=2
    point_farm()
    pyautogui.click()
    if status==0:
        move_mouse_left_cm(3)
        move_mouse_up_cm(-6)
        pyautogui.mouseDown()
        move_mouse_left_cm(-2)
        move_mouse_up_cm(2.5)

        move_mouse_left_cm(5)
        for x in range(4):
            move_mouse_left_cm(1)
            time.sleep(0.02)
        for x in range(15):
            move_mouse_left_cm(-1)
            time.sleep(0.02)
        move_mouse_left_cm(4)
        time.sleep(0.2)
        center_x, center_y = pyautogui.position()  # Get current mouse position as center
        speed = 0.005  # Speed of the mouse movement
        for x in range(6):
            pyautogui.moveTo(center_x, center_y)
            move_mouse_in_circle(center_x, center_y,250-x*40, 4-x*0.5, speed)
        pyautogui.mouseUp()
        shop()
        #time.sleep(20)
    if status==2:
        move_mouse_left_cm(5)
        pyautogui.mouseDown()
        #move_mouse_up_cm(1)
        for x in range(3):
            move_mouse_left_cm(1)
            time.sleep(0.02)
        for x in range(14):
            move_mouse_left_cm(-1)
            time.sleep(0.02)
        move_mouse_left_cm(4)
        time.sleep(0.2)
        center_x, center_y = pyautogui.position()  # Get current mouse position as center
        speed = 0.005  # Speed of the mouse movement
        for x in range(7):
            pyautogui.moveTo(center_x, center_y)
            move_mouse_in_circle(center_x, center_y,290-x*40, 4-x*0.5, speed)
        pyautogui.mouseUp()
        time.sleep(0.1)
        top_left()
        find_the_farm()
        status=wheat_status(0)
        if status != -1 :
            cut_and_plant(0,status1_count)

print(pyautogui.position())


status1_count=0
sleeping_min=60*8
runtime= 1
runedtime= 1
end_time = time.time() + sleeping_min*60
while  time.time() < end_time:
    time.sleep(0.1)
    top_left()
    time.sleep(0.1)
    find_the_farm()
    time.sleep(0.1)
    #point_farm()
    status=wheat_status(0)
    if status == -1 :
        pyautogui.moveTo(1601, 140)
        pyautogui.click()
        time.sleep(0.1)
        top_left()
        time.sleep(0.1)
        find_the_market()
        time.sleep(0.1)
        pyautogui.click()
        time.sleep(0.1)
        new_release = False
        while new_release is False:

            selling =0
            for market_y in y_coor:
                for market_x in x_coor:
                    #print()
                    print(f"moving to {market_x, market_y}")
                    pyautogui.moveTo(market_x, market_y)
                    pyautogui.click()
                    time.sleep(0.1)

                    pyautogui.moveTo(1317, 119)
                    time.sleep(0.1)
                    R,G,B,A = get_rgb_at_mouse()

                    print(f"market {market_x, market_y} rbg {R,G,B,A}")
                    if (R==231 and G==61 and B==70):
                        print(f"market {market_x, market_y} selling")
                        pyautogui.click()
                        selling+=1
                    else:
                        pyautogui.moveTo(703, 233)
                        R,G,B,A = get_rgb_at_mouse()
                        time.sleep(0.1)
                        #empty box
                        if(R!=254 and G!= 247 and B!=219):
                            pyautogui.moveTo(market_x, market_y)
                            pyautogui.click()
                            time.sleep(0.1)

                        pyautogui.moveTo(market_topleft[0], market_topleft[1])
                        pyautogui.click()
                        time.sleep(0.1)
                        pyautogui.moveTo(market_maxprice[0], market_maxprice[1])
                        pyautogui.click()
                        time.sleep(0.1)
                        pyautogui.moveTo(market_sell[0], market_sell[1])
                        pyautogui.click()
                        time.sleep(0.1)
                        new_release=True
                        selling+=1

            if selling ==10:
                print("fulled")
                pyautogui.moveTo(1490, 490)
                pyautogui.click()
                time.sleep(0.1)

                pyautogui.moveTo(1157, 491)
                pyautogui.click()
                time.sleep(0.1)

                pyautogui.moveTo(1093, 726)
                pyautogui.click()
                R,G,B,A = get_rgb_at_mouse()
                print(f"ad rgb {R,G,B,A}")
                #no ad (205, 205, 205, 255)
                #ad (220, 172, 78, 255)
                time.sleep(0.1)
                if (G>200 and B>200 or R==162 and G==133 and B==60):
                    pyautogui.moveTo(1318, 117)
                    pyautogui.click()
                else:
                    pyautogui.moveTo(1318, 120)
                    pyautogui.click()


        pyautogui.moveTo(1552, 129)
        pyautogui.click()
        time.sleep(0.1)

        status=0
        time.sleep(0.1)
        top_left()
        time.sleep(0.1)
        find_the_farm()
        time.sleep(0.1)
    print(status1_count)
    if cut_and_plant(status,status1_count)==-1:
        status1_count+=1
    else:
        status1_count=0

"""
    runedtime+=1
    if  runtime<runedtime:
        break
"""



'''
import keyboard
while True:
    if keyboard.is_pressed('`'):
        rgb_color = get_rgb_at_mouse()
        print(rgb_color)
        print(f"RGB at mouse position: {rgb_color}, {pyautogui.position()}")
        while keyboard.is_pressed('`'):  # Wait for the key to be released
            pass
'''

