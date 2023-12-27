from django.db import models

import numpy as np
def random_id():
        return "C_" + str(np.random.randint(1000,9000)) 
def random_pid():
        return "P_" + str(np.random.randint(1000,9000)) 
class Customer(models.Model):
    Customer_id = models.CharField(max_length=255,primary_key=True,default=random_id)
    name = models.CharField(max_length=255,null=False,blank=False)
    phone = models.CharField(max_length=255,null=False,blank=False,unique=True)
    email = models.CharField(max_length=255,null=False,blank=False,unique=True)
    city = models.CharField(max_length=255,null=False,blank=False)

    class Meta:
        db_table = 'Customer'
    def __str__(self):
        return f'Customer {self.pk}'
    
class Purchase_Order(models.Model):
    Purchase_id = models.CharField(max_length=255,primary_key=True,default=random_pid)
    Customer_id = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='purchases')
    Product_name = models.CharField(max_length=255,null=False,blank=False)
    Quality = models.IntegerField(null=False,blank=False)
    Pricing = models.FloatField(max_length=255,null=False,blank=False)
    mrp = models.FloatField(max_length=255,null=False,blank=False)


    class Meta:
        db_table = 'Purchase'
    def __str__(self):
        return f'Purchase {self.pk}'
    


class Shipment(models.Model):
    Customer_id = models.ForeignKey(Customer,on_delete=models.CASCADE)
    Purchase_id = models.ForeignKey(Purchase_Order,on_delete=models.CASCADE,related_name='shipments')
    Address = models.CharField(max_length=255,null=False,blank=False)
    City = models.CharField(max_length=255,null=False,blank=False)
    Pincode = models.FloatField(max_length=255,null=False,blank=False)


    class Meta:
        db_table = 'Shipment'
    def __str__(self):
        return f'Shipment {self.pk}'