export default function getAdMetrics(actionContext, payload, done) {
    actionContext.dispatch('GET_ADMETRICS', payload);
    done();
}
