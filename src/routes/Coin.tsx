import { Link, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    display: flex;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
    padding: 10px 20px;
    border-radius: 10px;
`

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    text-transform: uppercase;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Decsription = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0;
    gap: 10px;
`;

/*
React does not recognize the `isActive` prop on a DOM element 경고 해결법
isActive를 $isActive나 isactive로 변경

이유 : React18 이후 일관성을 높이고,
 사용자 혼동을 방지하기 위해 prop의 이름은 소문자나 앞에 $가 있어야만 사용자 지정 속성으로 인식함. 
 $가 추가된 이유는 일부 라이브러리 또는 구성 요소는 대문자를 사용하는 prop을 요구하기 때문.
*/
const Tab = styled.span<{ $isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
    padding: 7px 0px;
    border-radius: 10px;
    color: ${props => props.$isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

interface RouteParams {
    coinId: string
}

interface RouteState {
    state: {
        name: string
    }
}

interface InfoData {
    id: string;
    symbol: string;
    name: string;
    web_slug: string;
    asset_platform_id: null;
    platforms: null;
    detail_platforms: null;
    block_time_in_minutes: number;
    hashing_algorithm: string;
    categories: [{
        number: string
    }];
    preview_listing: boolean;
    public_notice: null;
    additional_notices: null;
    localization: {
        en: string;
    };
    description: {
        en: string;
    };
    links: {
        homepage: object;
        whitepaper: object;
        blockchain_site: [{
            number: string;
        }];
        official_forum_url: object;
        chat_url: [{
            number: string;
        }];
        announcement_url: object;
        twitter_screen_name: string;
        facebook_username: string;
        bitcointalk_thread_identifier: number;
        telegram_channel_identifier: string;
        subreddit_url: string;
        repos_url: object;
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    country_origin: string;
    genesis_date: object;
    sentiment_votes_up_percentage: object;
    sentiment_votes_down_percentage: object;
    watchlist_portfolio_users: number;
    market_cap_rank: object;
    market_data: object;
    community_data: object;
    developer_data: object;
    status_updates: object;
    last_updated: string;
    tickers: object;
}

interface PriceData {
    name: string;
    tickers: [{
        base: string;
        target: string;
        market: {
            has_trading_incentive: boolean;
            identifier: string;
            name: string;
        };
        last: number;
        volume: number;
        converted_last: {
            btc: number;
            eth: number;
            usd: number;
            usd_v2: number;
        };
        converted_volume: {
            btc: number;
            eth: number;
            usd: number;
            usd_v2: number;
        };
        trust_score: string;
        bid_ask_spread_percentage: number;
        timestamp: string;
        last_traded_at: string;
        last_fetch_at: string;
        is_anomaly: boolean;
        is_stale: boolean;
        trade_url: string;
        token_info_url: null;
        coin_id: string;
        target_coin_id: string;
    }]
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation() as RouteState;
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const history = useHistory();

    const { isLoading: infoLoading, data: infoData }
        = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData }
        = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId),
            {
                // refetchInterval: 5000,
            });
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <button
                onClick={() => history.goBack()}
                style={{
                    position: "absolute",
                    left: 50,
                    top: 50
                }}>
                Back
            </button>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    <img src={infoData?.image.small} alt={infoData?.name} />
                    <h1>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</h1>
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>${tickersData?.tickers[0].last}</span>
                        </OverviewItem>
                    </Overview>
                    <Decsription>
                        {infoData?.description.en.slice(0, 100)}...
                    </Decsription>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickersData?.tickers[0].target}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max supply</span>
                            <span>{tickersData?.name}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab $isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>
                                Chart
                            </Link>
                        </Tab>
                        <Tab $isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>
                                Price
                            </Link>
                        </Tab>
                    </Tabs>
                    <Switch>
                        <Route path="/:coinId/price">
                            <Price />
                        </Route>
                        <Route path="/:coinId/chart">
                            <Chart coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    )
}

export default Coin;  