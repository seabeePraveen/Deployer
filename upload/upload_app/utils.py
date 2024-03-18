import random

sCharacters = "abcdefghijklmnopqrstuvwxyz0123456789"
iRandomGeneratorLength = 20

def fnRandomNameGenerator():
    sOutput = ""
    for i in range(iRandomGeneratorLength):
        sOutput += random.choice(sCharacters)
    return sOutput