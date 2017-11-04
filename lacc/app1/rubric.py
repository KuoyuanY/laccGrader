class Rubric:
    questions = []
    category = ""
    def __init__(self, cat):
        self.category = cat
    def addQuestion(self, question):
        questions.append(question)

class RubricQuestion:
    criteria = ""
    dnme = ""
    mme = ""
    me = ""
    ee = ""
    score = 0
    def __init__(self, que, doesnt, minimal, meets, exceeds):
        self.question = que
        self.dnme = doesnt
        self.mme = minimal
        self.me = meets
        self.ee = exceeds
    

