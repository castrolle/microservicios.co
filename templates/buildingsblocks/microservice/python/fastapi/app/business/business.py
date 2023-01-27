from app.services.appservicetestapi_service import * 

class Business:
  service = ServiceTestService()

  def book2(self):
    # sending get request and saving the response as response object
    r = self.service.book2()
    return r
  def book4(self,data):
    # sending get request to service
    r = self.service.book4(data.json())
    return r

 

