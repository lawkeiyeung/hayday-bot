import requests
from bs4 import BeautifulSoup


def reading_input(url):
    response = requests.get(url)
    if response.status_code == 200:
        web = BeautifulSoup(response.content, 'html.parser')
        table = web.find('table')
        if table:
            rows = table.find_all('tr')
            table_content = []
            firstline = True
            for row in rows:
                cols = row.find_all('td')
                row_data = [col.get_text(strip=True) for col in cols]
                if firstline != True:
                    x_coord = int(row_data[0])
                    y_coord = int(row_data[2])
                    character = row_data[1]
                    table_content.append([x_coord, y_coord, character])
                else:
                    firstline = False
            return table_content
        else:
            print("No tables found in the document.")
            return None
    else:
        raise Exception(
            f"Failed to fetch document. Status code: {response.status_code}")

def sort_inputs(inputs):
  inputs = sorted(inputs, key=lambda row: row[0])
  sorted_inputs = sorted(inputs, key=lambda row: row[1], reverse=True)
  return sorted_inputs

def secret_decoding(inputs):

    """for input in inputs:
      print(input)"""

    nextline=inputs[0][1]
    skipbox=0
    for input in inputs:
        if nextline!=input[1]:
          print()
          nextline=input[1]
        else:
          for x in range(input[0]-skipbox-1):
            print(" ", end='')
        print(input[2], end='')
        skipbox=input[0]


def main(url):
    inputs = reading_input(url)
    sorted_inputs= sort_inputs(inputs)
    secret_decoding(sorted_inputs)


main("https://docs.google.com/document/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub")