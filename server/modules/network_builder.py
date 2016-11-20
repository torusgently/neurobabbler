import keras
from keras.models import Sequential
from keras.layers import Dense, Flatten, Dropout

import numpy as np
import json



class NetworkBuilder:

    def __init__(self, network_type="sequential"):

        print("Created new network builder")
        self.command_map = {
            "add_layer" : self.add_layer,
            "train" : self.train,
            "compile" : self.compile,
            "flatten" : self.flatten,
            "dropout" : self.dropout,
            "reset" : self.reset,
            "pop" : self.pop
        }

        #XOR dataset
        self.x = np.array([[0,0], [0,1], [1,1], [1,0]])
        self.y = np.array([0,1,0,1])

        if(network_type=="sequential"):
            self.model = Sequential()

    def dropout(self, parameters):

        if(not 'coeficient' in paramters):
            parameters['coeficient'] = 0.5

        model.add(Dropout(parameters['coeficient']))


    def flatten(self, parameters):

        self.model.add(Flatten())

    def do(self,command, parameters):
        print("Doing command: " + command)
        if(self.command_map[command] == None):
            raise Exception("Command is uknown: " + command)
        else:
            msg = self.command_map[command](parameters)
            if(msg == None):
                raise Exception("Every command has to give a message!")
            return msg

    def add_layer(self, parameters):


        print("Num layers: "  +  str(len(self.model.layers)))

        if(not 'input_size' in parameters and len(self.model.layers) == 0):
            #raise Exception("input_size not defined!")
            input_size = 2
        elif not 'input_size' in parameters:
            parameters['input_size'] = None
        else:
            parameters['input_size'] = int(parameters['input_size'])

        if(not 'output_size' in parameters):
            if(len(self.model.layers) >= 2):
                parameters['output_size'] = 1
            parameters['output_size'] = 1
            #raise Exception("output_size is not defined!")
        else:
            parameters['output_size'] = int(parameters['output_size'])

        if(not 'activation_function' in parameters):
            parameters['activation_function'] = 'relu'


        self.model.add(Dense(input_dim=parameters["input_size"], \
            output_dim=parameters["output_size"], init="uniform", activation=parameters["activation_function"]))


        return "Successfully added layer"

    def compile(self, parameters):

        if(not "metrics" in parameters):
            parameters["metrics"] = ["accuracy"]

        self.model.compile(optimizer='adam',
          loss='mse',
          metrics=['accuracy'])

        return "Successfully compiled model"

    def pop(self, parameters):
        self.model.pop()

    def reset(self, parameters):

        self.model = Sequential()

    def to_dict(self):
        [weights, bias] = self.model.get_weights()
        weights = weights.reshape(-1,).tolist()
        bias = bias.tolist()
        data = json.loads(self.model.to_json())
        data["W"] = weights
        data["b"] = bias

        return data


    def train(self, parameters):

        if(not "nb_epoch" in parameters):
            parameters["nb_epoch"] = 100

        try:
            self.model.fit(self.x, self.y, batch_size=len(self.x), nb_epoch=parameters["nb_epoch"], verbose=1)
        except Exception as e:
            print(e)

        return "Trained model"







