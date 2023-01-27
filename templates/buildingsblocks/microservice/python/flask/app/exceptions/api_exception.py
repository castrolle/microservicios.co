class api_exception(Exception):
    def __init__(self, message="Fallo en la aplicacion"):
        self.__message = message
        super().__init__(self.__message)