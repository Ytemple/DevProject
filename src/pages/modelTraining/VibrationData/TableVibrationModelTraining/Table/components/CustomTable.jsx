import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table,Pagination} from '@alifd/next';
import store from '../../../../../Store/index'
import {headerToken,hostPort} from '../../../../../../Common'
import $ from 'jquery'

export default class CustomTable extends Component {
  static displayName = 'CustomTable';
  static defaultProps = {
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: '', //页码
      totalCount: store.getState().ModelTrainingreducer.totalCount  //数据的总条数
    };
  }
  onChange = (currentPage) => {
    /**用来判断表单中是否有值，如果没有值，就按照原先的方式执行 如果有值，那么就else了 */
    let returnData
    console.log('22:30',currentPage) 
        $.ajax({
          type:"post",
          url:hostPort+"equip/modal/selectPage",
          contentType:"application/json;charset=UTF-8",
          dataType:'JSON',
          async:false,
          data:JSON.stringify({
            "pageNo":currentPage,
            "pageSize":10,
          }),
          success:function(res){
            if(res.flag){
             console.log('13:53',res)
             returnData=res.data
            }
          },
          error:function(){
          }
        })
        if(returnData){
          const action ={
              type:'modelTrainingOnChange',
              returnData
            }
          store.dispatch(action)
      }else{
        const action ={
          type:'modelTrainingOnChange',
        }
        store.dispatch(action)
      }
}

  renderColumns = () => {
    const { columns } = this.props;
    return columns.map((item) => {   //注意这儿map的是每一个columns里面的数据
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            key={item.key}
            title={item.title}
            cell={item.render}
            width={item.width || 350}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}  //每一个item都有对应的dataindex，通过这个index来匹配相应的数据
          width={item.width || 250}
        />
      );
    });
  };

  render() {
    console.log('22:19',store.getState().ModelTrainingreducer.totalCount)
    return (
      <div>
    <Table {...this.props}>{this.renderColumns()}</Table>
    <Pagination
                    onChange={this.onChange}
                    pageSize={(100 * 10) / store.getState().ModelTrainingreducer.totalCount}
                    current={this.state.pageNumber}
                    className="page-demo" />
      </div>
    )
  }
}
