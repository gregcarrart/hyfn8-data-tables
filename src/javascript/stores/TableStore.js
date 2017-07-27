import BaseStore from 'fluxible/addons/BaseStore';
import $ from 'jquery';

class TableStore extends BaseStore {
    static storeName = 'TableStore';

    static handlers = {
        GET_ADS: 'onGetAds',
        GET_ADMETRICS: 'onGetAdMetrics'
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.ads = null;
        this.adMetrics = null;
        this.size = 2000;
        this._cache = [];
    }

    onGetAds () {
        $.ajax({url: 'https://api.myjson.com/bins/17zil'})
            .done((data) => {
                this.ads = data;
                this.emitChange();
            });
    }

    onGetAdMetrics () {
        $.ajax({url: 'https://api.myjson.com/bins/42v7x'})
            .done((data) => {
                this.adMetrics = data;
                this.emitChange();
            });
    }

    getState () {
        return {
            ads: this.ads,
            adMetrics: this.adMetrics,
            size: this.size,
            _cache: this._cache
        }
    }

    getObjectAt(index) {
        if (index < 0 || index > this.size){
            return undefined;
        }
        if (this._cache[index] === undefined) {
            this._cache[index] = this.createFakeRowObjectData(index);
        }
        return this._cache[index];
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.ads = state.ads;
        this.adMetrics = state.adMetrics;
        this.size = state.size;
        this._cache = state._cache;
    }
}

export default TableStore;
