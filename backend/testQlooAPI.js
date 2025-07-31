import axios from 'axios';

const API_KEY = 'drHkPHJjRUY6dvt-KTo_f9_nWrFNjSHxgJwNYAZpeP0';

// User input (fallback to a default search)
const userQuery = process.argv[2] || 'romance';

// Simulated user demographics (these could come from user profile)
const userAge = 25;
const userGender = 'male'; // 'male', 'female', or 'other'
const userCountryCode = 'US';

console.log(`🔍 Finding recommendations for: "${userQuery}"`);

const displayResults = (entities) => {
    if (!entities || entities.length === 0) {
        console.log(`😕 No results found for "${userQuery}".`);
        return;
    }

    entities.forEach((entity, index) => {
        const p = entity.properties || {};
        const ext = entity.external || {};

        console.log(`\n🎬 ${index + 1}. ${entity.name}`);
        console.log(`   🗓️ Release: ${p.release_year || 'N/A'} (${p.release_date || 'Date N/A'})`);
        console.log(`   🧠 Description: ${p.description || 'No description available.'}`);
        console.log(`   ⏱️ Duration: ${p.duration ? `${p.duration} mins` : 'N/A'}`);
        console.log(`   🏢 Production: ${(p.production_companies || []).join(', ') || 'N/A'}`);
        console.log(`   🌎 Country: ${(p.release_country || []).join(', ') || 'N/A'}`);

        const tagNames = (entity.tags || []).map(tag => tag.name).slice(0, 5).join(', ');
        console.log(`   🏷️ Tags: ${tagNames || 'None'}`);

        const imdb = ext.imdb?.[0];
        const rt = ext.rottentomatoes?.[0];
        const mc = ext.metacritic?.[0];
        if (imdb || rt || mc) {
            console.log(`   📊 Ratings:`);
            if (imdb) console.log(`     🎞️ IMDb: ${imdb.user_rating} ⭐ (${imdb.user_rating_count} votes)`);
            if (rt) console.log(`     🍅 RottenTomatoes: ${rt.user_rating}% (${rt.user_rating_count} votes)`);
            if (mc) console.log(`     📰 Metacritic: Critic ${mc.critic_rating}/100, Users ${mc.user_rating}/10`);
        }

        console.log(`   📸 Image: ${p.image?.url || 'N/A'}`);
        console.log(`   🔗 Links: ${(p.websites || []).join(' | ') || 'None'}`);
        console.log('='.repeat(80));
    });
};

const fetchRecommendations = async () => {
    try {
        const res = await axios.get('https://hackathon.api.qloo.com/v2/insights', {
            headers: {
                'x-api-key': API_KEY
            },
            params: {
                'filter.type': 'urn:entity:movie',
                'filter.release_year.min': 2020,
                'filter.release_year.max': 2024,

                // Signals based on user input
                'signal.demographics.age.ids': '25_to_29',
                // "filter.tags": `urn:tag:keyword:media:romance`,

                'seed_entity_names': {userQuery}

                // You can add more signals here if needed
            }
        });

        const entities = res.data?.results?.[0]?.result || res.data?.results?.entities || [];
        displayResults(entities);
    } catch (err) {
        console.error('❌ Error fetching data:', err.response?.data || err.message);
    }
};

fetchRecommendations();
