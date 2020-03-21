from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerProfileOrAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.user.pk is None:
            return False
        else:
            return request.user.is_authenticated and not request.user.is_blocked

    def has_object_permission(self, request, view, obj):
        if request.user.pk is None:
            return False
        elif request.method in SAFE_METHODS and request.user.is_authenticated and not request.user.is_blocked:
            return True
        return (
            obj.pk == request.user.pk or request.user.is_staff) and not request.user.is_blocked


class IsOwnerProfileOrAdminOrReadOnlyForSaleItem(BasePermission):
    def has_permission(self, request, view):
        if request.user.pk is None:
            return request.method in SAFE_METHODS
        return bool(
            request.method in SAFE_METHODS or (
                request.user and
                request.user.is_authenticated) and not
            request.user.is_blocked
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return (obj.creator.pk ==
                request.user.pk or request.user.is_staff) and not request.user.is_blocked
