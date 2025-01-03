import { useEffect, useState } from 'react'
import styles from './sale.module.scss'
import { SaleProduct, SaleProductEnum } from '@/types/sale_product'
import { createPayOrder, queryProductList } from '@/apis'
import { useAccessStore } from '@/app/store/access'

export default function Sale() {
    const [products, setProducts] = useState<SaleProduct[]>([])
    const [htmlContent, setHtmlContent] = useState('')

    const payOrder = async (productId: number) => {
        const res = await createPayOrder(productId)
        const {data, code} = await res.json()
        // 登录拦截
        if (code === SaleProductEnum.NeedLogin) {
            console.log("还未登录")
            useAccessStore.getState().goToLogin()
        }
        // 支付唤起
        if (code === SaleProductEnum.SUCCESS) {
            console.log("创建订单成功，跳转" + data)
            setHtmlContent(data)

            const newWindow = window.open('', '_blank')
            if (newWindow) {
                newWindow.document.open()
                newWindow.document.write(htmlContent)
                newWindow.document.close()
            }
        }
    }

    const queryProductListHandle = async () => {
        const res = await queryProductList()
        const {data, code} = await res.json()
        // 登录拦截
        if (code == SaleProductEnum.NeedLogin) {
            useAccessStore.getState().goToLogin()
        }
        // 设置结果
        setProducts(data)
    }

    useEffect(()=>{
        queryProductListHandle().then(r=>{
        })
    }, [])

    return (
        <div className={styles['sale']}>
            {products?.map((product) => (
                <div key={product.productId} className={styles['product']}>
                    <div className={styles['product-name']}>
                        {product.productName}
                    </div>
                    <div className={styles['product-token']}>
                        {product.quota}<span className={styles['product-token-subscript']}>(条)</span>
                    </div>
                    <div className={styles['product-price']}>
                        <span style={{color: '#af0000', fontSize: '20px'}}>￥{product.price.toFixed(2)}</span>
                    </div>
                    <div className={styles["product-buy"]} onClick={() => payOrder(product.productId)}>
                        立即购买
                    </div>
                    <div className={styles['product-desc']}>
                        <span>{product.producrDesc}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}