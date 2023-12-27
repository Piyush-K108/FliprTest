from rest_framework import serializers
from .models import *

class CustomerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase_Order
        fields = '__all__'

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        exclude = ["Customer_id"]
        


class PurchaseOrder_withShipmentsSerializer(serializers.ModelSerializer):
    shipments = ShipmentSerializer(many=True, read_only=True)
    class Meta:
        model = Purchase_Order
        fields = '__all__'



class CustomerAllPurchaseserializer(serializers.ModelSerializer):
    purchases = PurchaseOrder_withShipmentsSerializer(many=True, read_only=True)
    class Meta:
        model = Customer
        fields = '__all__'

class CustomerAllPurchase_Onlyserializer(serializers.ModelSerializer):
    purchases = PurchaseOrderSerializer(many=True, read_only=True)
    class Meta:
        model = Customer
        fields = '__all__'