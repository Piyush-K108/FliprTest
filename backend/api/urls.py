from django.urls import path, include
from django.conf import settings
from .views import *
from django.conf.urls.static import static
urlpatterns = [
 
     path('Add_Customer/',AddCustomer,name='Add Customers'),
     path('Add_Purchase/', AddPurchase, name='Add Purchase'),
     path('Shipment/', Shipments, name='Add Shipment'),
     path('Customers_City/<str:city>/', CustomerFilterCity, name='Get Customer on City'),
     path('Customers_Purchases/', CustomersAllPurchase, name='Get Customers All Purchases'),
     path('Customers_Shipments/', CustomersAllPurchase_WithShipment, name='Get Customers All Purchases with Shipments'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
