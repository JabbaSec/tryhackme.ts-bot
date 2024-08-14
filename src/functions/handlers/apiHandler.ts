import axios from "axios";

const API_ROOM_URL = "https://tryhackme.com/api/room/details?codes=";
// const API_NEW_ROOM = "http://tryhackme.com/api/new-rooms/";
const API_TOKEN = "https://tryhackme.com/tokens/discord/";
const API_LEADERBOARD = "https://tryhackme.com/api/leaderboards";
const API_STATS = "https://tryhackme.com/api/site-stats";
const API_HACKTIVITIES = "https://tryhackme.com/api/hacktivities";
const API_USER = "https://tryhackme.com/api/discord/user/";
const API_GET_ARTICLES = "https://api.intercom.io/articles";
const API_SEARCH_ARTICLES = "https://api.intercom.io/articles/search";

module.exports = (client: any) => {
    client.handleAPI = {
        getRoomData: async (roomId: string) => {
            try {
                const res = await axios.get(API_ROOM_URL + roomId);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getTokenData: async (token: string) => {
            try {
                const res = await axios.get(API_TOKEN + token);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getUserData: async (userId: string) => {
            try {
                const res = await axios.get(API_USER + userId);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getLeaderboardData: async (monthly = false) => {
            try {
                const res = await axios.get(API_LEADERBOARD + (monthly ? "?monthly=true" : ""));
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getSiteStats: async () => {
            try {
                const res = await axios.get(API_STATS);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getPublicRooms: async (filterType = null) => {
            try {
                const res = await axios.get(API_HACKTIVITIES + (filterType ? "?type=" + filterType : ""));
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getArticles: async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
                        "Intercom-Version": "2.10",
                    },
                };

                const res = await axios.get(API_GET_ARTICLES, config);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },

        getArticlesBySearch: async (phrase: string) => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
                        "Intercom-Version": "2.10",
                    },
                };

                const res = await axios.get(API_SEARCH_ARTICLES + "?phrase=" + phrase, config);

                if (res.data.total_count == 0) {
                    return null;
                }

                const firstArticle = res.data.data.articles[0] || null;
                return firstArticle;
            } catch (error) {
                console.error(error);
            }
        },

        getOlliePicture: async () => {
            try {
                const res = await axios.get("https://ollie.muirlandoracle.co.uk")
                const data = res.data;
                if (data.status === "success") {
                    return data.message;
                } else {
                    console.error("Failed to get Ollie picture, error: " + data);
                    return null;
                }
            } catch (error) {
                console.error("failed to fetch ollie, error: " + error);
                return null;
            }

        }

    }
}
