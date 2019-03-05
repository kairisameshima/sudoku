import sys 
import numpy as np
from itertools import chain

# this function returns true if the row or column or sub square is correct
def is_valid_block(block):

    if(sorted(block) == range(1,10)):
        return True
    else:
        print(block)
        return False

# Check if the entire board is valid by testing the rows, columns and sub squares
def is_valid_board(board):
    for column in board:
        if not is_valid_block(column):
            return False

    for row in zip(*board):
        if not is_valid_block(row):
            return False

    for i in range(0,9,3):
        for j in range(0,9,3):
            square =  list(chain(*(row[j:j + 3] for row in board[i:i + 3])))
            if not is_valid_block(square):
                return False
    return True

# Finally we run our main function. The Express server will take any stdout and return that as our response data

def validate_inputs(board):
    validNumbers=['1','2','3','4','5','6','7','8','9']

    # Validate Input
    for cell in board:
        if(cell == ""):
            print("a cell is empty")
            return
        elif(not cell in validNumbers):
            print(cell + " is not a number between 1-9")
            return
        
    # Convert all valid entries to int
    boardInt = [int(s) for s in board]

    # Now we propagate a 2d array to represent our sudoku board
    axisBoard = [[],[],[],[],[],[],[],[],[]]
    for i in range(81):
        axisBoard[i%9].append(boardInt[i])


    if(is_valid_board(axisBoard)):
        print("This Puzzle is Solved!")
    else:
        print("This Puzzle is Not Solved!")

b = sys.argv[1].split(',')
validate_inputs(b)