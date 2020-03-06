from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerProfileOrAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.pk == request.user.pk or request.user.is_staff


class IsOwnerProfileOrAdminOrReadOnlyForSaleItem(BasePermission):
    def has_object_permission(self, request, view, obj):
        print(obj.creator.pk)
        if request.method in SAFE_METHODS:
            return True
        return obj.creator.pk == request.user.pk or request.user.is_staff
