import api from '../services/api';

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export function getSubscriptions() {
  return api.get('/subscriptions').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error, 'Failed to load subscriptions.'));
  });
}

export function createSubscription(payload) {
  return api.post('/subscriptions', payload).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error, 'Failed to create subscription.'));
  });
}

export function updateSubscriptionStatus(id, status) {
  return api.patch(`/subscriptions/${id}/status`, { status }).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error, 'Failed to update subscription.'));
  });
}
