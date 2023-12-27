import traceback
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView


@api_view(["POST"])
def AddCustomer(request):
    try:
        if request.method == 'POST':
            serializer = CustomerInfoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Customer added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
            return JsonResponse({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return HttpResponseBadRequest("Invalid request method. Only POST requests are allowed.")
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def AddPurchase(request):
    try:
        if request.method == 'POST':
            serializer = PurchaseOrderSerializer(data=request.data)
            if serializer.is_valid():
                pricing = serializer.validated_data.get('Pricing')
                mrp = serializer.validated_data.get('mrp')
                if pricing > mrp:
                    return Response({"error": "Pricing must be less than or equal to  MRP."}, status=status.HTTP_400_BAD_REQUEST)
                serializer.save()
                return JsonResponse({"message": "PurchaseOrder added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
            return JsonResponse({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return HttpResponseBadRequest("Invalid request method. Only POST requests are allowed.")
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(["POST"])
def Shipments(request):
    try:
        if request.method == 'POST':
            serializer = ShipmentSerializer(data=request.data)
            Purchase_id = request.data.get('Purchase_id')
            if serializer.is_valid():

                try:
                    Purchase = Purchase_Order.objects.get(Purchase_id=Purchase_id)
                    Customer_id = Purchase.Customer_id

        
                    serializer.validated_data['Customer_id'] = Customer_id

        
                    serializer.save()

                    return JsonResponse({"message": "Shipment added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)

                except Purchase_Order.DoesNotExist:
                    return JsonResponse({"error": f"Purchase_Order with Purchase_id={Purchase_id} does not exist"}, status=status.HTTP_404_NOT_FOUND)

            return JsonResponse({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return HttpResponseBadRequest("Invalid request method. Only POST requests are allowed.")

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    






@api_view(["GET"])
def CustomerFilterCity(request, city):
    try:
        if city==None or city=="":
           Customers = Customer.objects.all()  
        else:
            Customers = Customer.objects.filter(city=city)
        serializer = CustomerInfoSerializer(Customers, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(["GET"])
def CustomersAllPurchase(request):
    try:
        Customers = Customer.objects.all()
        serializer = CustomerAllPurchaseserializer(Customers, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Internal Server Error {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def CustomersAllPurchase_WithShipment(request):
    try:
        Customers = Customer.objects.all()
        serializer = CustomerAllPurchaseserializer(Customers, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Internal Server Error {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)