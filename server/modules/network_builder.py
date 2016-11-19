import keras
from keras.models import Sequential
from keras.layers import Dense
import numpy as np



class NetworkBuilder:

    def __init__(self, network_type="sequential"):

        self.command_map = {
            "add_layer" : self.add_layer,
            "train" : self.train
        }


        if(network_type=="sequential"):
            self.model = Sequential()


    def do(self,command, parameters):

        if(self.command_map[command] == None):
            raise Exception("Command is uknown: " + command)
        else:
            msg = self.command_map[command](parameters)
            if(msg == None):
                raise Exception("Every command has to give a message!")

    def add_layer(self, parameters):

        if(parameters['input_size'] is None and len(self.model.layers) == 0):
            raise Exception("input_size not defined!")

        if(parameters['output_size'] is None):
            raise Exception("output_size is not defined!")

        if(parameters['activation_function'] is None):
            parameters['activation_function'] = 'relu'


        self.model.add(Dense(input_dim=parameters["input_size"], \
            output_dim=parameters["output_size"], init="uniform", activation=parameters["activation_function"]))


        return "Successfully added layer"

    def compile(self, parameters):

        self.model.compile(optimizer='mse',
          loss='categorical_crossentropy',
          metrics=['accuracy'])

        return "Successfully compiled model"


    def train(self, parameters):
        try:
            self.model.fit(self.x, self.y, batch_size=32, nb_epoch=10, verbose=1)
        except e:
            print(e)

        return "Trained model"







