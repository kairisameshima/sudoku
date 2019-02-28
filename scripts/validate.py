import sys 
import numpy as np
from itertools import chain


# Convert the list of strings into a list of ints
b = sys.argv[1].split(',')
boardInt = [int(s) for s in b]

# Now we propagate a 2d array to represent our sudoku board
axisBoard = [[],[],[],[],[],[],[],[],[]]
for i in range(81):
    axisBoard[i%9].append(boardInt[i])


# this function returns true if the row or column or sub square is correct
def is_valid_block(block):
    return len(block) == 9 and sum(block) == 45

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
if(is_valid_board(axisBoard)):
    print("This Puzzle is Solved!")
else:
    print("This Puzzle is Not Solved!")

