import random

sCharacters = "abcdefghijklmnopqrstuvwxyz0123456789"
iRandomGeneratorLength = 10

def fnRandomNameGenerator():
    sOutput = ""
    for i in range(iRandomGeneratorLength):
        sOutput += random.choice(sCharacters)
    return sOutput