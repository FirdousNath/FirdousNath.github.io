window.addEventListener("DOMContentLoaded", async function () {
    async function get(url) {
        const resp = await fetch(url);
        return resp.json();
    }

    document.querySelectorAll(".stack-card").forEach(async function (el) {
        const userId = el.getAttribute("user-id");

        const response = await get(
            `https://api.stackexchange.com/2.2/users/${userId}?site=stackoverflow`
        );
        const user = response.items[0];
        const {
            profile_image,
            link,
            display_name,
            reputation,
            user_id,
        } = user;
        const { gold, silver, bronze } = user.badge_counts;

        const profileLink = link;

        el.innerHTML = `
        <a href="${profileLink}" target="_blank" style="text-decoration: none; color: black; display: block; border-radius: 12px; padding: 16px; font-size: 14px; background: linear-gradient(135deg, #8b5cf6, #6366f1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease-in-out;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); overflow: hidden;">
                    <img style="width: 100%; height: 100%; object-fit: cover;" src="${profile_image}" alt="Profile image">
                </div>
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #fff;">${display_name}</h3>
                    <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">
                        @${link.replace("https://", "").replace(`/users/${user_id}`, "")}
                    </p>
                </div>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; text-align: center;">
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">REPUTATION</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${reputation}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">GOLD</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${gold}</p>
                </div>
                                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">SILVER</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${silver}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">BRONZE</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${bronze}</p>
                </div>
            </div>
        </a>
        `;
    });

    document.querySelectorAll(".github-card").forEach(async function (el) {
        const username = el.getAttribute("username");

        const response = await get(`https://api.github.com/users/${username}`);
        const { name, avatar_url, public_repos, followers, html_url, following } =
            response;

        el.innerHTML = `
        <a href="${html_url}" target="_blank" style="text-decoration: none; color: black; display: block; border-radius: 12px; padding: 16px; font-size: 14px; background: linear-gradient(135deg, #8b5cf6, #6366f1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease-in-out;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #fff;" src="${avatar_url}" alt="Profile image"></img>
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #fff;">${name}</h3>
                    <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">
                        @${html_url.replace("https://", "")}
                    </p>
                </div>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; text-align: center;">
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">REPOSITORIES</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${public_repos}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">FOLLOWERS</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${followers}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">FOLLOWING</p>
                    <p style="font-size: 20px; font-weight: bold; color: #fff;">${following}</p>
                </div>
            </div>
        </a>
        `;
    });
});
