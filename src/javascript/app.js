import Fluxible from 'fluxible';
import { PropTypes } from 'react';
import Routes from 'components/Routes.jsx';
import ApplicationStore from 'stores/ApplicationStore';
import TableStore from 'stores/TableStore';

import assetUrl from 'libs/assetUrl';

const app = new Fluxible({
    component: Routes,
});

app.plug(assetUrl);

app.customContexts = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired,
};

app.registerStore(ApplicationStore);
app.registerStore(TableStore);

export default app;
