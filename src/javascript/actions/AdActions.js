export default function getAds(actionContext, payload, done) {
    actionContext.dispatch('GET_ADS', payload);
    done();
}
