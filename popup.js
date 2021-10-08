document.addEventListener('DOMContentLoaded', () => {

    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, (tabs) => {
        var currentTabURL = tabs[0].url;

        if (currentTabURL.includes('github.com')) {
            // in: https://github.com/streamlit/demo-uber-nyc-pickups/blob/master/streamlit_app.py
            // out: https://share.streamlit.io/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
            const streamlitURL = currentTabURL.replace('github.com', 'share.streamlit.io').replace('blob/', '');
            chrome.tabs.create({ url: streamlitURL });
        }

        else if (currentTabURL.includes('share.streamlit.io')) {

            if (currentTabURL.endsWith('.py')) {
                // in: https://share.streamlit.io/streamlit/repo/main/main.py
                // out: https://github.com/streamlit/repo/blob/main/main.py
                var urlParts = currentTabURL.split('/');
                const repositoryName = urlParts[4];
                const repositoryPlusBlob = repositoryName.concat('/blob');
                const githubURL = currentTabURL.replace('share.streamlit.io', 'github.com')
                    .replace(repositoryName, repositoryPlusBlob);

                chrome.tabs.create({ url: githubURL });

            }

            else {
                // in: https://share.streamlit.io/streamlit/demo-uber-nyc-pickups
                // out: https://github.com/streamlit/demo-uber-nyc-pickups/blob/master/streamlit_app.py
                const githubURL = currentTabURL.replace('share.streamlit.io', 'github.com')
                    .concat('/blob/master/streamlit_app.py');
                chrome.tabs.create({ url: githubURL });
            }



        }


    });
});
