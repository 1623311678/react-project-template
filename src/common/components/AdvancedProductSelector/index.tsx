/**
 * 商品和系列选择器
 */

import React, { memo, useEffect, useCallback, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import SelectModel from './components/Model'
import SelectList from './components/List'
import { getCollectionsList } from "@src/api/collections"

const useStyles = makeStyles(
	theme => ({
		selectContent: {
			display: "flex",
			minHeight: "120px",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			border: "0.5px solid #ccc",
			borderRadius: "5px",
			backgroundColor: "rgba(246, 246, 247, 1)",
			marginBottom: "10px",
			padding: "12px"
		},
		selectButton: {
			width: "50%",
			minWidth: "80px",
			minHeight: "32px",
			border: "0.5px solid #ccc",
			borderRadius: "5px",
			backgroundColor: "#fff",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontWeight: 500,
			fontSize: "14px",
		},
		optionButton: {
			marginTop: "10px",
			display: "flex",
			justifyContent: "space-between",
		},
		selectImage: {
			marginRight: "10px",
			width: "30px",
			height: "30px"
		},
		selectedItem: {
			display: "flex",
			// justifyContent: "space-between",
			alignItems: "center"
		},
		selectedItemTitle: {
			overflow: "hidden",
			textOverflow: "ellipsis",
			height: "40px"
		},
		checkItem: {
			borderBottom: "0.5px solid #ccc",
			marginBottom: "5px",
			padding: "5px",
			width: "100%"
		}
	}),
	{
		name: "BusinessChoice"
	}
);

export interface BusinessChoiceProps {
	title?: string;
	check?: boolean;
	getlist?: (_v: any) => any;
	columns?: any[];
	defaultSelectedRows: any[];
	handleSelect?: (_v: any) => any
}

const _variables = {
	first: 10,
	after: null,
	query: null,
	sortKey: "ID",
	status:'ACTIVE',
	reverse: false
}

// 获取系列列表
const getCollectionList = async variables => {
	const data = await getCollectionsList(variables);
	const nodes = data.data.collections.edges;
	const pageInfo = data.data.collections.pageInfo;
	return {
		nodes: nodes.map(item => item.node),
		pageInfo,
		cursor: nodes.length ? nodes.pop().cursor : ""
	};
};

const BusinessChoice: React.FC<BusinessChoiceProps> = ({ title, defaultSelectedRows, handleSelect, check }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(true);
	const [butLoading, setButLoading] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false)
	const [selectedRows, setSelectedRows] = useState<any[]>(defaultSelectedRows)
	const [lists, setLists] = useState<any[]>([])
	const [pageInfo, setPageInfo] = useState<any>()
	const [variables, setVariables] = useState<any>(_variables)

	useEffect(() => {
		setSelectedRows(defaultSelectedRows)
	}, [defaultSelectedRows])


	// 打开选择列表
	const handleOpenModel = async () => {
		setShow(true)
		setLoading(true)
		const { nodes, pageInfo, cursor } = await getCollectionList(_variables)
		setLists(nodes)
		setPageInfo(pageInfo)
		if (pageInfo.hasNextPage) {
			setVariables({
				...variables,
				after: cursor
			})
		}
		setLoading(false)
	}

	// 弹窗选择
	const handleOk = () => {
		setVariables(variables)
		handleSelect(selectedRows)
		setShow(false)
	}

	// 弹窗取消选择
	const handleCancel = () => {
		setSelectedRows(defaultSelectedRows)
		setVariables(variables)
		setShow(false)
	}

	// 删除当前选择
	const handleDelete = () => {
		handleSelect([])
	}

	// 搜索
	const handleSearch = async (e) => {
		const _value = e.target.value
		const _serVariables = {
			...variables,
			query: _value
		}
		setLists([])
		setLoading(true)
		const { nodes, pageInfo, cursor } = await getCollectionList(_serVariables)
		setLists(nodes)
		setPageInfo(pageInfo)
		setLoading(false)
		if (pageInfo.hasNextPage) {
			setVariables({
				..._serVariables,
				after: cursor
			})
		}
	}

	// model props
	const modelProps = {
		title,
		show,
		loading,
		selectedRows,
		handleOk,
		handleCancel,
		handleSearch
	}

	// 加载更多items
	const handleMore = async () => {
		setButLoading(true)
		const { nodes, pageInfo, cursor } = await getCollectionList(variables)

		setLists([
			...lists,
			...nodes
		])
		setPageInfo(pageInfo)
		setButLoading(false)
		if (pageInfo.hasNextPage) {
			setVariables({
				...variables,
				after: cursor
			})
		}
	}

	// 处理选中的keys
	const handleToggle = (item) => {
		if (check) {
			const { id } = item

			const ids = selectedRows.map(p => String(p.id))
			const currentIndex = ids.indexOf(String(id));

			if (currentIndex === -1) {
				selectedRows.push(item)
			} else {
				selectedRows.splice(currentIndex, 1);
			}
			setSelectedRows([...selectedRows])
		} else {
			setSelectedRows([item])
		}
	}

	// list props
	const listProps = {
		title,
		show,
		butLoading,
		lists,
		pageInfo,
		selectedRows,
		handleMore,
		handleToggle
	}

	return (
		<>
			{
				!show && (
					<div className={classes.selectContent}>
						{
							selectedRows.length ? <>
								{
									selectedRows.map(_r => {
										if (_r.id) {
											return (
												<div className={check ? classes.checkItem : ""} key={_r.id}>
													<div className={classes.selectedItem}>
														{_r.image && <img className={classes.selectImage} src={_r.image.originalSrc} alt={_r.image.altText} />}
														{_r.featuredImage && <img className={classes.selectImage} src={_r.featuredImage.transformedSrc} alt={_r.featuredImage.altText} />}
														<div className={classes.selectedItemTitle}>{_r.title}</div>
													</div>
												</div>
											)
										}
									})
								}
								<div className={classes.optionButton}>
									<Button style={{ minWidth: "90px" }} variant="outlined" onClick={handleOpenModel}>
										更改
                    				</Button>
									<Button style={{ minWidth: "90px" }} variant="outlined" onClick={handleDelete}>
										删除
                    				</Button>
								</div>
							</> : <Button style={{ width: "60%" }} variant="outlined" onClick={handleOpenModel} >选择 {title}</Button>
						}
					</div>
				)
			}
			<SelectModel {...modelProps}>
				<SelectList {...listProps} />
			</SelectModel>
		</>
	)
}

export default memo(BusinessChoice)