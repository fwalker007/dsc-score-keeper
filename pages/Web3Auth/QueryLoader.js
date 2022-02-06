import React from 'react';

class QueryLoader extends React.Component
 {
    _onCreate = () => {
        window._kiq = window._kiq || [];
    };
    
    _onSuccess = () => 
    {
        const userStr = localStorage.getItem('user');
        const user = JSON.parse(userStr);
        if (!user) return;

        const email = user.email;
        window._kiq.push(['identify', email]);
    };
    
    _onError = error =>
     {
        throw new Error(`Could not load ${error.outerHTML}`);
    };

    render()
     {
        return (
            <script
                src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
                type="text/javascript"
               // onCreate={this._onCreate}
               // onSuccess={this._onSuccess}
               // onError={this._onError}
                defer
            />
        );
    }
}

export default QueryLoader;