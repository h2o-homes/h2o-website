<template>
    <div class="usage">
        <div class="container">
            <div class="header">Token Usage</div>
            <div class="grid">
                <div class="item">
                    <div class="title">Decentralized Decision-making</div>
                    <div class="desc">
                        The governance model of H2O aligns with the
                        decentralized ethos of Web3, offering a transparent and
                        inclusive platform for community-driven policy-making
                        and innovatio such as voting on proposals, platform
                        upgrades, and community initiatives
                    </div>
                </div>
                <div class="item">
                    <div class="title">Community-centric Welfare System</div>
                    <div class="desc">
                        The welfare system built around the H2O token ensures
                        that holders benefit from the growth of the platform,
                        receiving timely information and sharing in the
                        collective success through airdrops and exclusive access
                        like whitelisting and airdrops.
                    </div>
                </div>
                <div class="item">
                    <div class="title">Enhanced Participation Rights</div>
                    <div class="desc">
                        With the H2O token, community members can secure
                        priority participation in new NFT and DeFi ventures,
                        reflecting the token's intrinsic value and utility in
                        the Web3 space.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .usage {
        position: relative;
        padding-bottom: 360px;
        //overflow: hidden;
        &:before {
            content: '';
            position: absolute;
            top: -184px;
            right: 0;
            width: 348px;
            height: 648px;
            background: url('../../../assets/img/index/usage-i2@2x.png') center
                no-repeat;
            background-size: 100% 100%;
        }
        &:after {
            content: '';
            position: absolute;
            bottom: -296px;
            left: 0;
            width: 453px;
            height: 911px;
            background: url('../../../assets/img/index/usage-i3@2x.png') center
                no-repeat;
            background-size: 100% 100%;
            z-index: 1;
        }
        .header {
            margin-bottom: 72px;
            text-align: center;
            font-weight: bold;
            font-size: 45px;
        }
        .grid {
            position: relative;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 24px;
            margin: 0 auto;
            width: 800px;
            max-width: 100%;
            z-index: 1;

            &:before {
                content: '';
                position: absolute;
                top: -232px;
                left: -248px;
                width: 468px;
                height: 468px;
                background: url('../../../assets/img/index/c3.png') center
                    no-repeat;
                background-size: 100% 100%;
            }
            .item {
                padding: 54px;
                border: 1px solid @border-color-base;
                border-radius: @border-radius-base;
                background: linear-gradient(137deg, #101229 0%, #000000 100%);
                .title {
                    margin-bottom: 16px;
                    line-height: 1;
                    font-weight: 600;
                    font-size: 30px;
                }
                .desc {
                    color: @text-color-secondary;
                }
            }
        }
    }
    @media (max-width: 767px) {
        .usage {
            position: relative;
            padding-bottom: 334px;
            &:before {
                display: none;
            }

            &:after {
                content: '';
                position: absolute;
                left: auto;
                right: 0;
                bottom: -80px;
                width: 324px;
                height: 648px;
                background: url('../../../assets/img/index/usage-i4@2x.png')
                    center no-repeat;
                background-size: 100% 100%;
                z-index: 1;
            }
            .header {
                margin-bottom: 40px;
                font-size: 24px;
            }
            .grid {
                .item {
                    .title {
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>
